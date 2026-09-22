const db = require('./db');

async function fixMissing() {
  await db.query('UPDATE content_courses SET image_url = $1 WHERE title = $2', ['/courses/devops_k8s_1790006227973.jpg', 'Kubernetes']);
  await db.query('UPDATE content_courses SET image_url = $1 WHERE title = $2', ['/courses/devops_ansible_1790006242826.jpg', 'Ansible']);
  await db.query('UPDATE content_courses SET image_url = $1 WHERE title = $2', ['/courses/devops_aws_1790006269612.jpg', 'AWS DevOps']);
  await db.query('UPDATE content_courses SET image_url = $1 WHERE title = $2', ['/courses/devops_aws_cert_1790006282910.jpg', 'AWS Certified Solutions Architect']);
  console.log('Fixed missing DevOps images!');
  process.exit(0);
}

fixMissing();
