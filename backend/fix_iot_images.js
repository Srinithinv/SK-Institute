const db = require('./db');

async function fixIoTImages() {
  const updates = [
    { title: 'Internet of Things (IoT)', file: 'iot_1_iot_1790048928870.jpg' },
    { title: 'IoT with Arduino', file: 'iot_2_arduino_1790048940110.jpg' },
    { title: 'IoT with Raspberry Pi', file: 'iot_3_raspberrypi_1790048954759.jpg' },
    { title: 'Embedded Systems', file: 'iot_4_embedded_1790048992481.jpg' },
    { title: 'Embedded C', file: 'iot_5_embeddedc_1790049006235.jpg' },
    { title: 'Robotics', file: 'iot_6_robotics_1790049019426.jpg' },
    { title: 'Industrial Automation', file: 'iot_7_industrial_1790049031550.jpg' },
    { title: 'PLC & SCADA', file: 'iot_8_plcscada_1790049044667.jpg' }
  ];

  for (const update of updates) {
    console.log(`Updating ${update.title} to use ${update.file}...`);
    try {
      await db.query('UPDATE content_courses SET image_url = $1 WHERE title = $2', [`/courses/${update.file}`, update.title]);
    } catch (err) {
      console.error(`Failed to update ${update.title}:`, err);
    }
  }

  console.log('Fixed IoT images!');
  process.exit(0);
}

fixIoTImages();
