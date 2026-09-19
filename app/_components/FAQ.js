import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/_components/ui/accordion";

function FAQ() {
  const faqItems = [
    {
      question: "Who is Rungs build for?",
      answer:
        "Rungs is build specifically for independent strength coaches managing their own roster of clients — not gyms, not large training organizations. If you're currently running business trough a mix of spreadsheets and Instagram Dms, Rungs is meant to replace that whole workflow.",
    },
    {
      question: "Do I need credit card to start?",
      answer:
        "No. You get a full 14-day trial with every feature unlocked, no credit card required. You'll only be asked for payment details if you decide to continue after the trial ends.",
    },
    {
      question: "How do I add clients to Rungs?",
      answer:
        "You invite clients directly from your dashboard. Once they accept, their profile, program history, and logged sessions all live in one place — no more digging through old messages to find what you lase assigned them.",
    },
    {
      question: "Can I track a client's progress over time?",
      answer:
        "Yes, Every logged set, body weight entry, and personal record is tracked automatically, so you can see trends — not just the most recent number — for each client you coach.",
    },
    {
      question: "What happens if a client stops logging their workouts?",
      answer:
        "Rungs flags clients who've gone quiet directly on your dashboard, so you know who needs a check-in before it becomes a bigger problem — instead of finding out weeks later.",
    },
    {
      question: "Can I build multi-week programs, not just single workouts?",
      answer:
        "Yes. Programs are organized by week and by day, so you can lay out a full training block — progressive overload, deloads, and all — rather than assigning one workout at a time.",
    },
    {
      question: "Is there a limit to how many clients I can manage?",
      answer:
        "During the trial, no. Pricing and any plan limits are outlined on our pricing page — reach out if you're coaching a larger roster and want to talk specifics before committing.",
    },
  ];

  return (
    <div className="flex flex-col gap-4 md:grid md:grid-cols-3 p-5 border-2 border-steel rounded-xl">
      <div className="flex flex-col gap-4">
        <span className="text-2xl font-medium">FAQ&apos;s</span>
        <span className="text-sm text-slate">
          Everything you need to know about the product and other information.
          Can&apos;t find the answer you&apos;re looking for?
        </span>

        <span className="text-sm text-slate">
          Say hi at{" "}
          <a
            className="text-iron underline"
            href="mailto:ilyajafari18@gmail.com"
          >
            ilyajafari18@gmail.com
          </a>
        </span>
      </div>

      <div className="col-span-2">
        <Accordion type="single" collapsible>
          {faqItems.map((faqItem, index) => (
            <AccordionItem key={faqItem.question} value={`item-${index + 1}`}>
              <AccordionTrigger className="text-lg">
                {faqItem.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate">
                {faqItem.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

export default FAQ;
