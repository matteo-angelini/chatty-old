import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum MessageStatus {
  SENT = "SENT",
  DELIVERED = "DELIVERED",
  READ = "READ"
}



type MessageMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ChatRoomMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ChatRoomUserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Message {
  readonly id: string;
  readonly userID?: string | null;
  readonly chatroomID?: string | null;
  readonly content?: string | null;
  readonly image?: string | null;
  readonly audio?: string | null;
  readonly status?: MessageStatus | keyof typeof MessageStatus | null;
  readonly replyToMessageID?: string | null;
  readonly forUserId?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Message, MessageMetaData>);
  static copyOf(source: Message, mutator: (draft: MutableModel<Message, MessageMetaData>) => MutableModel<Message, MessageMetaData> | void): Message;
}

export declare class ChatRoom {
  readonly id: string;
  readonly newMessages?: number | null;
  readonly LastMessage?: Message | null;
  readonly Messages?: (Message | null)[] | null;
  readonly Admin?: User | null;
  readonly name?: string | null;
  readonly imageUri?: string | null;
  readonly ChatRoomUsers?: (ChatRoomUser | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly chatRoomLastMessageId?: string | null;
  readonly chatRoomAdminId?: string | null;
  constructor(init: ModelInit<ChatRoom, ChatRoomMetaData>);
  static copyOf(source: ChatRoom, mutator: (draft: MutableModel<ChatRoom, ChatRoomMetaData>) => MutableModel<ChatRoom, ChatRoomMetaData> | void): ChatRoom;
}

export declare class User {
  readonly id: string;
  readonly name: string;
  readonly sub: string;
  readonly imageUri?: string | null;
  readonly status?: string | null;
  readonly Messages?: (Message | null)[] | null;
  readonly lastOnlineAt?: number | null;
  readonly publicKey?: string | null;
  readonly chatrooms?: (ChatRoomUser | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class ChatRoomUser {
  readonly id: string;
  readonly chatRoom: ChatRoom;
  readonly user: User;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<ChatRoomUser, ChatRoomUserMetaData>);
  static copyOf(source: ChatRoomUser, mutator: (draft: MutableModel<ChatRoomUser, ChatRoomUserMetaData>) => MutableModel<ChatRoomUser, ChatRoomUserMetaData> | void): ChatRoomUser;
}