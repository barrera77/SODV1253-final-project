import { act, fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ChatPage from "../pages/ChatPage";
import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom";

// Use vi.hoisted to create a mock socket that can be referenced in vi.mock
const mockSocket = vi.hoisted(() => ({
  emit: vi.fn(),
  on: vi.fn(),
  off: vi.fn(),
}));

// Mocking the socket connection using the hoisted mock
vi.mock("socket.io-client", () => ({
  io: vi.fn(() => mockSocket),
}));

describe("ChatPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSocket.emit.mockClear();
    mockSocket.on.mockClear();
    mockSocket.off.mockClear();
  });

  it("renders the page with chat elements", () => {
    render(
      <Router>
        <ChatPage />
      </Router>
    );

    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Message in "general"')
    ).toBeInTheDocument();
    expect(screen.getByText("Send")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter new room name")
    ).toBeInTheDocument();
  });

  it("sends a message when the form is submitted", () => {
    render(
      <Router>
        <ChatPage />
      </Router>
    );

    const messageInput = screen.getByPlaceholderText('Message in "general"');
    const sendButton = screen.getByText("Send");

    fireEvent.change(messageInput, { target: { value: "Hello World!" } });
    fireEvent.click(sendButton);

    expect(mockSocket.emit).toHaveBeenCalledWith("chat message", {
      room: "general",
      message: "Hello World!",
    });
  });

  it("renders new messages when received", async () => {
    render(
      <Router>
        <ChatPage />
      </Router>
    );

    const newMessage = "New message from socket";
    const chatMessageListener = mockSocket.on.mock.calls.find(
      (call) => call[0] === "chat message"
    );
    if (chatMessageListener && chatMessageListener[1]) {
      await act(async () => {
        chatMessageListener[1](newMessage);
        await new Promise((resolve) => setTimeout(resolve, 0));
      });
    }

    expect(screen.getByText(newMessage)).toBeInTheDocument();
  });

  it("creates a new room and switches to it", () => {
    render(
      <Router>
        <ChatPage />
      </Router>
    );

    // Get the input and button for creating a room
    const roomInput = screen.getByPlaceholderText("Enter new room name");
    const createButton = screen.getByText("Create Room");

    // Simulate entering a room name and clicking the button
    fireEvent.change(roomInput, { target: { value: "NEWROOM" } });
    fireEvent.click(createButton);

    // Check if the room has been added to the room list
    expect(screen.getByRole("combobox")).toHaveTextContent("NEWROOM");
  });

  it("switches rooms when a new room is selected", () => {
    render(
      <Router>
        <ChatPage />
      </Router>
    );

    // Get the room select dropdown
    const roomSelect = screen.getByRole("combobox");

    // Change the selected room
    fireEvent.change(roomSelect, { target: { value: "AAPL" } });

    // Check if the room has been updated
    expect(
      screen.getByPlaceholderText('Message in "AAPL"')
    ).toBeInTheDocument();
  });
});
