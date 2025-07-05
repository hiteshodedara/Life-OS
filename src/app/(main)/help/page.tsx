import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail } from "lucide-react";

export default function HelpPage() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="p-4 md:p-6">
      <PageHeader
        title="Help & Support"
        description="Find answers to common questions and get in touch with us."
      />
      <div className="grid gap-6 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I add a new transaction?</AccordionTrigger>
                <AccordionContent>
                  To add a new transaction, navigate to the "Expenses" page and click the "Add Transaction" button. Fill in the details in the dialog that appears and click "Save transaction".
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Can I change the currency?</AccordionTrigger>
                <AccordionContent>
                  Yes, you can change your preferred currency. Go to the "Settings" page and select your desired currency from the dropdown menu. This will update the currency display across the application.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How does the AI Assistant work?</AccordionTrigger>
                <AccordionContent>
                  The AI Assistant can help you manage your tasks, notes, and expenses. You can ask it to add, update, or delete items, or ask it questions about your data. For example, try asking "What are my high-priority tasks?" or "Add a note to call the bank."
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>How do I change the theme?</AccordionTrigger>
                <AccordionContent>
                  You can switch between light, dark, and system themes on the "Settings" page. Your preference will be saved for your next visit.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
            <CardDescription>
              If you can't find the answer you're looking for, please don't hesitate to reach out.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <a href="mailto:hitesh.odedara.dev@gmail.com" className="text-primary hover:underline">
                hitesh.odedara.dev@gmail.com
              </a>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center text-sm text-muted-foreground mt-4">
          <p>&copy; {currentYear} Life OS by Hitesh Odedara. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
