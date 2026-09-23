import { NextResponse } from "next/server";
import createClient from "@/app/_lib/supabase";
import { supabaseAdmin } from "@/app/_lib/supabase-admin";

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const inviteToken = searchParams.get("invite");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data: existingProfile } = await supabase
        .from("profiles")
        .select("id, role")
        .eq("id", user.id)
        .single();

      let role = existingProfile?.role;

      if (!existingProfile) {
        if (inviteToken) {
          // Athlete sing-in
          const { data: invitation, error: inviteErr } = await supabaseAdmin
            .from("invitations")
            .select("id, coach_id, first_name, last_name")
            .eq("token", inviteToken)
            .eq("status", "pending")
            .gt("expires_at", new Date().toISOString())
            .single();

          if (invitation) {
            const { error: profileErr } = await supabaseAdmin
              .from("profiles")
              .insert({
                id: user.id,
                role: "athlete",
                full_name: `${invitation.first_name} ${invitation.last_name}`,
                avatar_url: user.user_metadata.avatar_url ?? null,
              });
            if (profileErr) console.error("profile insert failed:", profileErr);

            const { error: clientErr } = await supabaseAdmin
              .from("clients")
              .insert({
                profile_id: user.id,
                coach_id: invitation.coach_id,
                status: "active",
              });
            if (clientErr) console.error("client insert failed:", clientErr);

            const { error: statusErr } = await supabaseAdmin
              .from("invitations")
              .update({ status: "accepted" })
              .eq("id", invitation.id);
            if (statusErr)
              console.error("invitation status update failed:", statusErr);

            role = "athlete";
          } else {
            // Token was invalid, already used, or expired
            console.error("invitation lookup failed:", inviteErr);
            return NextResponse.redirect(
              `${origin}/login?error=invalid-invite`,
            );
          }
        } else {
          // Coach sign-in
          await supabase.from("profiles").insert({
            id: user.id,
            role: "coach",
            full_name: user.user_metadata.full_name ?? user.email,
            avatar_url: user.user_metadata.avatar_url ?? null,
          });

          role = "coach";
        }
      }

      console.log("callback url: ", request.url);
      console.log("invite token from url: ", inviteToken);

      const destination = role === "athlete" ? "/home" : "/dashboard";
      return NextResponse.redirect(`${origin}${destination}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth-failed`);
}
