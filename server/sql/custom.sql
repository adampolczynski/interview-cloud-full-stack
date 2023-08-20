-- Custom Functions/Views can go here

DROP VIEW IF EXISTS devices_view;

CREATE VIEW devices_view AS
  SELECT name, u.email as "userEmail",
  u.admin as "userIsAdmin",
  fw.major || '.' || fw.minor || '.' || fw.patch as "firmwareVersion",
  fw.major as "firmwareVersionMajor",
  fw.minor as "firmwareVersionMinor",
  fw.patch as "firmwareVersionPatch",
  up.finished as "lastUpdate",
  CASE WHEN (SELECT max(id) FROM firmware_versions) = firmware_version_id THEN True ELSE False END as "isLatestVersion"
  FROM devices d
  LEFT JOIN users u ON u.email = d.user_email
  LEFT JOIN firmware_versions fw ON fw.id = d.firmware_version_id
  LEFT JOIN updates up ON up.device_id = d.id
    WHERE u.subscription_ends > DATETIME('now')