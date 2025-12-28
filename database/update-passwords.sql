-- Update password hashes with correct bcrypt values
USE college_erp;

UPDATE admins 
SET password_hash = '$2a$10$m11b1g6y51KFerepIqCceOt73hsiF4b.zX.UMIme78rFFk23a2EAe' 
WHERE email = 'admin@college.edu';

UPDATE teachers 
SET password_hash = '$2a$10$6FSf6JIe1XZ.1x6tdP9yTuuM0GqxmA7vnM.YkqDA6u66oWRIpPEAm';

UPDATE parents 
SET password_hash = '$2a$10$YShDgdNBxk3bwOUis4u8sOCmfQjOnlNQnhL6ob2mxYPQvtjL1BxYq';

SELECT 'Password hashes updated successfully!' AS status;
