// 'use client';
//
// import React, { useRef, useState } from 'react';
// import { MessageCircle, Trash } from 'lucide-react';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
//
// // 타입 정의
// interface Reaction {
//   emoji: string;
//   count: number;
// }
//
// export interface MessageProps {
//   id: number;
//   isMine: boolean;  // 'sender' 대신 'isMine' boolean 속성으로 변경
//   text: string;
//   reactions: Reaction[];
//   replies: number;
//   nickname?: string;
//   onLongPress?: (messageId: number) => void;
//   selected?: boolean;
// }
//
// // 메시지 아이템 컴포넌트
// const MessageItem: React.FC<MessageProps> = ({
//                                                id,
//                                                isMine,
//                                                text,
//                                                reactions,
//                                                replies,
//                                                nickname,
//                                                onLongPress,
//                                                selected,
//                                              }) => {
//   const messageRef = useRef<HTMLDivElement | null>(null);
//   const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);
//
//   // 우클릭 핸들러
//   const handleContextMenu = (e: React.MouseEvent): void => {
//     if (isMine) return;
//
//     e.preventDefault();
//     e.stopPropagation();
//
//     if (onLongPress) {
//       onLongPress(id);
//     }
//   };
//
//   // 꾹 누르기(long press) 시작 핸들러
//   const handleTouchStart = (e: React.TouchEvent): void => {
//     if (isMine) return;
//
//     const timer = setTimeout(() => {
//       e.stopPropagation();
//       if (onLongPress) {
//         onLongPress(id);
//       }
//     }, 400);
//
//     setLongPressTimer(timer);
//   };
//
//   // 꾹 누르기(long press) 종료 핸들러
//   const handleTouchEnd = (): void => {
//     if (longPressTimer) {
//       clearTimeout(longPressTimer);
//       setLongPressTimer(null);
//     }
//   };
//
//   // 터치 메뉴 이벤트 핸들러
//   const handleTouchMenu = (e: React.TouchEvent): void => {
//     e.stopPropagation();
//   };
//
//   return (
//     <div
//       className={`flex mb-4 ${isMine ? 'justify-end' : 'justify-start'}`}
//     >
//       {!isMine && (
//         <div className="flex flex-col items-center mr-2">
//           <Avatar>
//             <AvatarImage src="https://github.com/shadcn.png" />
//             <AvatarFallback>CN</AvatarFallback>
//           </Avatar>
//         </div>
//       )}
//       <div className="flex flex-col max-w-xs relative">
//         {nickname && (
//           <span className="text-xs mb-1 text-greyscale-10">{nickname}</span>
//         )}
//         <div
//           ref={messageRef}
//           className={`px-4 py-3 text-sm rounded-[32px] ${
//             isMine
//               ? 'bg-primary-50 text-greyscale-90'
//               : 'bg-greyscale-80 text-white'
//           }`}
//           onContextMenu={handleContextMenu}
//           onTouchStart={handleTouchStart}
//           onTouchEnd={handleTouchEnd}
//           onTouchCancel={handleTouchEnd}
//           onTouchMove={handleTouchEnd}
//         >
//           {text}
//         </div>
//
//         {/* 메시지 메뉴 (클릭 시 표시) */}
//         {selected && !isMine && (
//           <div
//             className="absolute top-full left-0 mt-1 bg-white rounded-lg p-1 z-20 w-24 shadow-lg"
//             onClick={(e) => e.stopPropagation()}
//             onTouchStart={handleTouchMenu}
//             onTouchEnd={handleTouchMenu}
//             onTouchMove={handleTouchMenu}
//           >
//             <button className="flex items-center justify-between w-full text-left px-2 py-1 text-sm text-greyscale-90 hover:bg-gray-100 transition-colors duration-200 rounded">
//               <span>좋아요</span>
//               <span>😊</span>
//             </button>
//
//             <button className="flex items-center justify-between w-full text-left px-2 py-1 text-sm text-greyscale-90 hover:bg-gray-100 transition-colors duration-200 rounded">
//               <span>댓글</span>
//               <MessageCircle size={14} />
//             </button>
//
//             <button className="flex items-center justify-between w-full text-left px-2 py-1 text-sm text-red-500 hover:bg-gray-100 transition-colors duration-200 rounded">
//               <span>삭제</span>
//               <Trash size={14} />
//             </button>
//           </div>
//         )}
//
//         {/* 이모지와 댓글 개수 표시 */}
//         <div className={`flex items-center text-xs mt-1 cursor-pointer ${isMine ? 'justify-end' : 'justify-start'}`}>
//           {/* 이모지 반응 표시 */}
//           {reactions.length > 0 && (
//             <div className="flex rounded-full py-1">
//               {reactions.map((reaction, index) => (
//                 <div key={index} className="flex items-center mr-1 text-xs">
//                   <span className="mr-1">{reaction.emoji}</span>
//                   <span className="text-greyscale-10">{reaction.count}</span>
//                 </div>
//               ))}
//             </div>
//           )}
//
//           {/* 댓글 개수 표시 */}
//           {replies > 0 && (
//             <div className="flex items-center py-1">
//               <span className="mr-1 text-greyscale-10">· 댓글</span>
//               <span className="text-greyscale-10">{replies}</span>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default MessageItem;
