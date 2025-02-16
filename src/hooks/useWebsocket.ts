// import { useEffect, useRef, useState, useCallback } from 'react';
// import { Client, Message, Frame } from '@stomp/stompjs';
//
// interface StompConfig {
//   brokerURL: string;
//   connectHeaders?: Record<string, string>;
//   reconnectDelay?: number;
//   maxReconnectAttempts?: number;
//   heartbeatIncoming?: number;
//   heartbeatOutgoing?: number;
// }
//
// interface UseStompResult {
//   client: Client | null;
//   connected: boolean;
//   error: Error | null;
//   reconnectAttempts: number;
//   subscribe: (destination: string, callback: (message: Message) => void) => () => void;
//   publish: (destination: string, body: string, headers?: Record<string, string>) => void;
//   disconnect: () => void;
//   reconnect: () => void;
// }
//
// const DEFAULT_RECONNECT_DELAY = 5000;
// const DEFAULT_MAX_RECONNECT_ATTEMPTS = 5;
// const DEFAULT_HEARTBEAT = 10000;
//
// export const useStomp = ({
//   brokerURL,
//   connectHeaders = {},
//   reconnectDelay = DEFAULT_RECONNECT_DELAY,
//   maxReconnectAttempts = DEFAULT_MAX_RECONNECT_ATTEMPTS,
//   heartbeatIncoming = DEFAULT_HEARTBEAT,
//   heartbeatOutgoing = DEFAULT_HEARTBEAT,
// }: StompConfig): UseStompResult => {
//   const [connected, setConnected] = useState<boolean>(false);
//   const [error, setError] = useState<Error | null>(null);
//   const [reconnectAttempts, setReconnectAttempts] = useState<number>(0);
//   const clientRef = useRef<Client | null>(null);
//   const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
//
//   const clearReconnectTimeout = () => {
//     if (reconnectTimeoutRef.current) {
//       clearTimeout(reconnectTimeoutRef.current);
//       reconnectTimeoutRef.current = null;
//     }
//   };
//
//   const attemptReconnect = useCallback(() => {
//     if (reconnectAttempts >= maxReconnectAttempts) {
//       setError(new Error(`최대 재연결 시도 횟수(${maxReconnectAttempts}회)를 초과했습니다.`));
//       return;
//     }
//
//     clearReconnectTimeout();
//     reconnectTimeoutRef.current = setTimeout(
//       () => {
//         if (clientRef.current) {
//           setReconnectAttempts(prev => prev + 1);
//           try {
//             clientRef.current.activate();
//           } catch (e) {
//             setError(e instanceof Error ? e : new Error('재연결 중 오류가 발생했습니다.'));
//           }
//         }
//       },
//       reconnectDelay * Math.pow(2, reconnectAttempts),
//     ); // 지수 백오프 적용
//   }, [reconnectAttempts, maxReconnectAttempts, reconnectDelay]);
//
//   useEffect(() => {
//     const client = new Client({
//       brokerURL,
//       connectHeaders,
//       reconnectDelay,
//       heartbeatIncoming,
//       heartbeatOutgoing,
//       onConnect: () => {
//         setConnected(true);
//         setError(null);
//         setReconnectAttempts(0);
//         clearReconnectTimeout();
//       },
//       onDisconnect: () => {
//         setConnected(false);
//         attemptReconnect();
//       },
//       onStompError: (frame: Frame) => {
//         setError(new Error(`STOMP 오류: ${frame.body}`));
//         setConnected(false);
//         attemptReconnect();
//       },
//       onWebSocketError: (event: Event) => {
//         setError(new Error('WebSocket 오류가 발생했습니다.'));
//         setConnected(false);
//         attemptReconnect();
//       },
//     });
//
//     clientRef.current = client;
//     client.activate();
//
//     return () => {
//       clearReconnectTimeout();
//       if (client.active) {
//         client.deactivate();
//       }
//     };
//   }, [brokerURL, connectHeaders, reconnectDelay, heartbeatIncoming, heartbeatOutgoing, attemptReconnect]);
//
//   const subscribe = useCallback((destination: string, callback: (message: Message) => void) => {
//     if (!clientRef.current) {
//       throw new Error('STOMP 클라이언트가 초기화되지 않았습니다.');
//     }
//
//     const subscription = clientRef.current.subscribe(destination, callback);
//     return () => {
//       subscription.unsubscribe();
//     };
//   }, []);
//
//   const publish = useCallback((destination: string, body: string, headers?: Record<string, string>) => {
//     if (!clientRef.current) {
//       throw new Error('STOMP 클라이언트가 초기화되지 않았습니다.');
//     }
//
//     clientRef.current.publish({
//       destination,
//       body,
//       headers,
//     });
//   }, []);
//
//   const disconnect = useCallback(() => {
//     if (clientRef.current) {
//       clearReconnectTimeout();
//       clientRef.current.deactivate();
//     }
//   }, []);
//
//   const reconnect = useCallback(() => {
//     if (clientRef.current) {
//       setReconnectAttempts(0);
//       clearReconnectTimeout();
//       clientRef.current.activate();
//     }
//   }, []);
//
//   return {
//     client: clientRef.current,
//     connected,
//     error,
//     reconnectAttempts,
//     subscribe,
//     publish,
//     disconnect,
//     reconnect,
//   };
// };
