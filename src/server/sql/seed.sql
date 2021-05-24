-- DO NOT MODIFY THIS FILE

INSERT INTO user_permissions
  ("user_email", "permission")
VALUES
  ('anadir@greendale.edu', 'delete'),
  ('anadir@greendale.edu', 'update'),
  ('phawthorne@aol.com', 'delete')
;

INSERT INTO users
(
  "email",
  "admin",
  "subscription_ends"
)
VALUES
(
  'jwinger@greendale.edu',
  false,
  DATETIME('NOW', '+2 DAYS')
),
(
  'anadir@greendale.edu',
  false,
  DATETIME('NOW', '+3 DAYS')
),
(
  'phawthorne@aol.com',
  false,
  DATETIME('NOW', '-2 DAYS')
),
(
  'jpicard@starfleet.gov',
  true,
  DATETIME('NOW', '-2 HOURS')
);

INSERT INTO firmware_versions
(
  "major",
  "minor",
  "patch"
)
VALUES
( 0, 9, 0 ),
( 1, 0, 0 ),
( 1, 1, 0 ),
( 1, 2, 0 ),
( 1, 9, 0 ),
( 2, 0, 0 )
;

INSERT INTO devices
(
  "name",
  "user_email",
  "version_id"
)
VALUES
(
  'Car',
  'jwinger@greendale.edu',
  1
),
(
  'Refrigerator',
  'jwinger@greendale.edu',
  4
),
(
  'PC',
  'anadir@greendale.edu',
  2
),
(
  'Phone',
  'jpicard@starfleet.gov',
  6
),
(
  'Tablet',
  'phawthorne@aol.com',
  2
);

INSERT INTO updates
(
  "version_id",
  "device_id",
  "finished"
)
VALUES
( 5, 3, datetime('now', '-3 DAYS') ),
( 6, 3, datetime('now', '-2 DAYS') ),
( 6, 4, datetime('now', '-2 DAYS') ),
( 6, 1, NULL ),
( 6, 2, NULL )
;
