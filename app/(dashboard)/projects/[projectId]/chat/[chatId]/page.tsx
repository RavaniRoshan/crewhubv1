import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { ChatInterface } from "@/components/chat/chat-interface";
import { ChatHeader } from "@/components/chat/chat-header";

interface ChatPageProps {
  params: {
    projectId: string;
    chatId: string;
  };
}

export default function ChatPage({ params }: ChatPageProps) {
  const { projectId, chatId } = params;
  const isNewChat = chatId === "new";

  // In a real app, we would fetch the conversation data if it's not a new chat
  const conversationData = isNewChat ? null : {
    id: chatId,
    title: "New product feature discussion",
    messages: [],
    model: "gpt-4"
  };

  return (
    <DashboardShell>
      <div className="flex flex-col h-[calc(100vh-4rem)] overflow-hidden">
        <ChatHeader 
          projectId={projectId} 
          chatId={chatId} 
          isNewChat={isNewChat}
          title={conversationData?.title}
        />
        <ChatInterface 
          projectId={projectId} 
          chatId={chatId} 
          isNewChat={isNewChat}
          initialModel={conversationData?.model || "gpt-4"}
        />
      </div>
    </DashboardShell>
  );
}