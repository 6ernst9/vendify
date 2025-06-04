INSERT INTO session (
    user_id, store_id, session_cookie, access_token, refresh_token, start_time, last_activity, pages_visited
) VALUES
(2, '6839d4104106e209e93ea39c', 'sess-abc-101', 'token-101-a', 'refresh-101-a', NOW() - INTERVAL '6 hours', NOW() - INTERVAL '4 hours', ARRAY['/home', '/product:1', '/cart']),
(3, '6839d4104106e209e93ea39c', 'sess-abc-102', 'token-102-b', 'refresh-102-b', NOW() - INTERVAL '3 hours', NOW() - INTERVAL '1 hours', ARRAY['/login', '/browse']),
(4, '6839d4104106e209e93ea39c', 'sess-abc-103', 'token-103-c', 'refresh-103-c', NOW() - INTERVAL '5 hours', NOW() - INTERVAL '2 hours', ARRAY['/product:2', '/checkout']),

(5, '6839d4104106e209e93ea39d', 'sess-xyz-201', 'token-201-a', 'refresh-201-a', NOW() - INTERVAL '7 hours', NOW() - INTERVAL '5 hours', ARRAY['/home', '/product:3']),
(6, '6839d4104106e209e93ea39d', 'sess-xyz-202', 'token-202-b', 'refresh-202-b', NOW() - INTERVAL '7 hours', NOW() - INTERVAL '6 hours', ARRAY['/about', '/contact']),
(7, '6839d4104106e209e93ea39d', 'sess-xyz-203', 'token-203-c', 'refresh-203-c', NOW() - INTERVAL '6 hours', NOW() - INTERVAL '4 hours', ARRAY['/home']);