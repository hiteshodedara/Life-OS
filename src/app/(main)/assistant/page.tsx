import AssistantChat from "@/features/assistant/components/AssistantChat";
import PageHeader from "@/components/shared/PageHeader";

export default function AssistantPage() {
  return (
    <div className="flex flex-col h-full p-4 md:p-6">
      <PageHeader
        title="AI Assistant"
        description="Ask questions or get personalized suggestions based on your data."
      />
      <AssistantChat />
    </div>
  );
}
