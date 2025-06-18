INSERT INTO session (
    user_id, store_id, session_cookie, access_token, refresh_token, start_time, last_activity, end_time, pages_visited, actions
) VALUES
      (2, '6839d4104106e209e93ea39c', 'sess-abc-101', 'token-101-a', 'refresh-101-a', NOW() - INTERVAL '6 hours', NOW() - INTERVAL '4 hours', NULL, ARRAY['home', 'product:1', 'cart', 'checkout'],
       ARRAY['view-home', 'view-product:1', 'view-cart', 'view-checkout','place-order', 'add-to-cart:2', 'add-to-wishlist:2']),
      (2, '6839d4104106e209e93ea39c', 'sess-abc-101', 'token-101-b', 'refresh-101-b', NOW() - INTERVAL '14 hours', NOW() - INTERVAL '13 hours', NOW() - INTERVAL '13 hours', ARRAY['home', 'wishlist'],
       ARRAY['view-home', 'view-product:2','view-wishlist', 'add-to-cart:2']),
      (NULL, '6839d4104106e209e93ea39c', 'sess-abc-102', 'token-102-b', 'refresh-102-b', NOW() - INTERVAL '3 hours', NOW() - INTERVAL '1 hours', NULL, ARRAY['browse', 'product:4', 'cart'],
       ARRAY['view-all-products', 'view-product:4', 'add-to-cart:4','add-to-cart:2','add-to-wishlist:2', 'add-to-wishlist:3']),
      (NULL, '6839d4104106e209e93ea39c', 'sess-abc-102', 'token-102-old', 'refresh-102-old', NOW() - INTERVAL '26 hours', NOW() - INTERVAL '25 hours', NOW() - INTERVAL '25 hours', ARRAY['login'], ARRAY['login', 'add-to-wishlist:3']),

      (NULL, '6839d4104106e209e93ea39c', 'sess-abc-103', 'token-103-c', 'refresh-103-c', NOW() - INTERVAL '5 hours', NOW() - INTERVAL '2 hours', NULL, ARRAY['product:2', 'cart'],
       ARRAY['view-product:2','view-product:1', 'remove-from-cart:2', 'add-to-cart:4','add-to-wishlist:2']),

      (NULL, '6839d4104106e209e93ea39c', 'sess-abc-104', 'token-104', 'refresh-104', NOW() - INTERVAL '12 hours', NOW() - INTERVAL '10 hours', NULL, ARRAY['contact'], ARRAY['view-contact','add-to-wishlist:2','add-to-wishlist:3']),
      (6, '6839d4104106e209e93ea39c', 'sess-abc-105', 'token-105', 'refresh-105', NOW() - INTERVAL '10 hours', NOW() - INTERVAL '9 hours', NULL, ARRAY['terms', 'account'],
       ARRAY['view-home', 'view-product:2','view-account','add-to-wishlist:2','add-to-wishlist:2']),
      (NULL, '6839d4104106e209e93ea39c', 'sess-abc-106', 'token-106', 'refresh-106', NOW() - INTERVAL '8 hours', NOW() - INTERVAL '7 hours', NULL,  ARRAY['contact'], ARRAY['view-product:1','view-contact', 'add-to-cart:4','add-to-wishlist:2','add-to-wishlist:2']),
      (NULL, '6839d4104106e209e93ea39c', 'sess-abc-107', 'token-107', 'refresh-107', NOW() - INTERVAL '9 hours', NOW() - INTERVAL '6 hours', NULL, ARRAY['home'], ARRAY['view-home']),
      (9, '6839d4104106e209e93ea39c', 'sess-abc-108', 'token-108', 'refresh-108', NOW() - INTERVAL '4 hours', NOW() - INTERVAL '2 hours', NULL, ARRAY['browse'], ARRAY['view-product:1','view-all-products', 'add-to-cart:4','add-to-wishlist:2']),
      (NULL, '6839d4104106e209e93ea39c', 'gen-abc-0', 'token-gen-abc-0', 'refresh-gen-abc-0', NOW() - INTERVAL '4 hours', NOW(), NULL, ARRAY['product:1'], ARRAY['view-product:1', 'add-to-cart:1', 'add-to-wishlist:1']),
      (NULL, '6839d4104106e209e93ea39c', 'gen-abc-1', 'token-gen-abc-1', 'refresh-gen-abc-1', NOW() - INTERVAL '4 hours', NOW(), NULL, ARRAY['product:2'], ARRAY['view-product:2', 'add-to-cart:2', 'add-to-wishlist:2']),
      (NULL, '6839d4104106e209e93ea39c', 'gen-abc-2', 'token-gen-abc-2', 'refresh-gen-abc-2', NOW() - INTERVAL '1 hours', NOW(), NULL, ARRAY['product:3'], ARRAY['view-product:3', 'add-to-cart:3', 'add-to-wishlist:3']),
      (NULL, '6839d4104106e209e93ea39c', 'gen-abc-3', 'token-gen-abc-3', 'refresh-gen-abc-3', NOW() - INTERVAL '7 hours', NOW(), NULL, ARRAY['product:4'], ARRAY['view-product:4', 'add-to-cart:4', 'add-to-wishlist:4']),
      (NULL, '6839d4104106e209e93ea39c', 'gen-abc-4', 'token-gen-abc-4', 'refresh-gen-abc-4', NOW() - INTERVAL '5 hours', NOW(), NULL, ARRAY['product:5'], ARRAY['view-product:5', 'add-to-cart:5', 'add-to-wishlist:5']),
      (25, '6839d4104106e209e93ea39c', 'gen-abc-5', 'token-gen-abc-5', 'refresh-gen-abc-5', NOW() - INTERVAL '3 hours', NOW(), NULL, ARRAY['product:6'], ARRAY['view-product:6', 'add-to-cart:6', 'add-to-wishlist:6']),
      (NULL, '6839d4104106e209e93ea39c', 'gen-abc-6', 'token-gen-abc-6', 'refresh-gen-abc-6', NOW() - INTERVAL '2 hours', NOW(), NULL, ARRAY['product:7'], ARRAY['view-product:7', 'add-to-cart:7', 'add-to-wishlist:7']),
      (NULL, '6839d4104106e209e93ea39c', 'gen-abc-7', 'token-gen-abc-7', 'refresh-gen-abc-7', NOW() - INTERVAL '6 hours', NOW(), NULL, ARRAY['product:8'], ARRAY['view-product:8', 'add-to-cart:8', 'add-to-wishlist:8']),
      (NULL, '6839d4104106e209e93ea39c', 'gen-abc-8', 'token-gen-abc-8', 'refresh-gen-abc-8', NOW() - INTERVAL '9 hours', NOW(), NULL, ARRAY['product:9'], ARRAY['view-product:9', 'add-to-cart:9', 'add-to-wishlist:9']);


INSERT INTO session (
    user_id, store_id, session_cookie, access_token, refresh_token, start_time, last_activity, end_time, pages_visited, actions
) VALUES
      (NULL, '6839d4104106e209e93ea39d', 'sess-xyz-201', 'token-201-a', 'refresh-201-a', NOW() - INTERVAL '7 hours', NOW() - INTERVAL '5 hours', NULL,  ARRAY['home', 'product:3', 'wishlist'],
       ARRAY['view-home', 'view-product:3', 'add-to-wishlist:3']),
      (NULL, '6839d4104106e209e93ea39d', 'sess-xyz-201', 'token-201-b', 'refresh-201-b', NOW() - INTERVAL '30 hours', NOW() - INTERVAL '29 hours', NOW() - INTERVAL '29 hours', ARRAY['faq'], ARRAY['view-contact']),
      (NULL, '6839d4104106e209e93ea39d', 'sess-xyz-202', 'token-202-b', 'refresh-202-b', NOW() - INTERVAL '7 hours', NOW() - INTERVAL '6 hours', NULL, ARRAY['about', 'contact'],
       ARRAY['view-contact', 'view-contact']),
      (3, '6839d4104106e209e93ea39d', 'sess-xyz-203', 'token-203-c', 'refresh-203-c', NOW() - INTERVAL '6 hours', NOW() - INTERVAL '4 hours', NULL, ARRAY['home', 'wishlist'], ARRAY['view-home', 'view-wishlist']),
      (3, '6839d4104106e209e93ea39d', 'sess-xyz-203', 'token-203-d', 'refresh-203-d', NOW() - INTERVAL '48 hours', NOW() - INTERVAL '47 hours', NOW() - INTERVAL '47 hours', ARRAY['logout'], ARRAY['view-account']),
      (NULL, '6839d4104106e209e93ea39d', 'sess-xyz-204', 'token-204', 'refresh-204', NOW() - INTERVAL '11 hours', NOW() - INTERVAL '10 hours', NULL, ARRAY['browse'], ARRAY['view-all-products']),
      (NULL, '6839d4104106e209e93ea39d', 'sess-xyz-205', 'token-205', 'refresh-205', NOW() - INTERVAL '5 hours', NOW() - INTERVAL '4 hours', NULL, ARRAY['account'], ARRAY['view-account']),
      (NULL, '6839d4104106e209e93ea39d', 'sess-xyz-206', 'token-206', 'refresh-206', NOW() - INTERVAL '3 hours', NOW() - INTERVAL '2 hours', NULL,  ARRAY['browse', 'product:8'], ARRAY['view-all-products', 'view-product:8']),
      (4, '6839d4104106e209e93ea39d', 'sess-xyz-207', 'token-207', 'refresh-207', NOW() - INTERVAL '2 hours', NOW() - INTERVAL '1 hour', NULL, ARRAY['contact'], ARRAY['view-contact']),
      (NULL, '6839d4104106e209e93ea39d', 'sess-xyz-208', 'token-208', 'refresh-208', NOW() - INTERVAL '1 hour', NOW(), NULL, ARRAY['home', 'product:5'],
       ARRAY['view-home', 'view-product:5']),
      (30, '6839d4104106e209e93ea39d', 'gen-xyz-0', 'token-gen-xyz-0', 'refresh-gen-xyz-0', NOW() - INTERVAL '4 hours', NOW(), NULL, ARRAY['product:10'], ARRAY['view-product:10', 'add-to-cart:10', 'add-to-wishlist:10']),
      (NULL, '6839d4104106e209e93ea39d', 'gen-xyz-1', 'token-gen-xyz-1', 'refresh-gen-xyz-1', NOW() - INTERVAL '4 hours', NOW(), NULL, ARRAY['product:11'], ARRAY['view-product:11', 'add-to-cart:11', 'add-to-wishlist:11']),
      (NULL, '6839d4104106e209e93ea39d', 'gen-xyz-2', 'token-gen-xyz-2', 'refresh-gen-xyz-2', NOW() - INTERVAL '1 hours', NOW(), NULL, ARRAY['product:12'], ARRAY['view-product:12', 'add-to-cart:12', 'add-to-wishlist:12']),
      (NULL, '6839d4104106e209e93ea39d', 'gen-xyz-3', 'token-gen-xyz-3', 'refresh-gen-xyz-3', NOW() - INTERVAL '7 hours', NOW(), NULL, ARRAY['product:13'], ARRAY['view-product:13', 'add-to-cart:13', 'add-to-wishlist:13']),
      (NULL, '6839d4104106e209e93ea39d', 'gen-xyz-4', 'token-gen-xyz-4', 'refresh-gen-xyz-4', NOW() - INTERVAL '5 hours', NOW(), NULL, ARRAY['product:14'], ARRAY['view-product:14', 'add-to-cart:14', 'add-to-wishlist:14']),
      (NULL, '6839d4104106e209e93ea39d', 'gen-xyz-5', 'token-gen-xyz-5', 'refresh-gen-xyz-5', NOW() - INTERVAL '3 hours', NOW(), NULL, ARRAY['product:15'], ARRAY['view-product:15', 'add-to-cart:15', 'add-to-wishlist:15']),
      (NULL, '6839d4104106e209e93ea39d', 'gen-xyz-6', 'token-gen-xyz-6', 'refresh-gen-xyz-6', NOW() - INTERVAL '2 hours', NOW(), NULL, ARRAY['product:16'], ARRAY['view-product:16', 'add-to-cart:16', 'add-to-wishlist:16']),
      (NULL, '6839d4104106e209e93ea39d', 'gen-xyz-7', 'token-gen-xyz-7', 'refresh-gen-xyz-7', NOW() - INTERVAL '6 hours', NOW(), NULL, ARRAY['product:17'], ARRAY['view-product:17', 'add-to-cart:17', 'add-to-wishlist:17']),
      (NULL, '6839d4104106e209e93ea39d', 'gen-xyz-8', 'token-gen-xyz-8', 'refresh-gen-xyz-8', NOW() - INTERVAL '9 hours', NOW(), NULL, ARRAY['product:18'], ARRAY['view-product:18', 'add-to-cart:18', 'add-to-wishlist:18']);
