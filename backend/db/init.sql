INSERT INTO "user" (email, hashed_password, is_admin, created_at)
VALUES (
  'admin@example.com',
  '$2b$12$HXb7j0E9CnLkBlNq1wM4X.gkvHBG9S4k30TjsnQwGbsh0A44QvVni', -- hash "admin123"
  true,
  NOW()
);

INSERT INTO call (call_id, timestamp, duration, destination, sip_code, answered, ingested_at)
VALUES
  ('call-1', NOW() - interval '1 hour', 30, '5511999999999', 200, true, NOW()),
  ('call-2', NOW() - interval '2 hour', 0, '5511888888888', 486, false, NOW()),
  ('call-3', NOW() - interval '30 minutes', 120, '5511777777777', 200, true, NOW()),
  ('call-4', NOW() - interval '10 minutes', 0, '5511666666666', 486, false, NOW()),
  ('call-5', NOW() - interval '5 minutes', 60, '5511555555555', 200, true, NOW());

