
export const DB_LIMIT = 5;

export const ADMIN_SECRET_KEY = '!!ADMIN123__';
export const SECRET_KEY = 'ILOVECOACH7';


// To make the API Reusable. This code is being reused for 3 times.
// - Situation, - Student_report, - Class_report
const defaultProjects = {
  _id: 1,
  'class_name.class_name': 1,
  'coaches_data.name': 1,
  tanggal: 1,
  komentar: 1,
};

export const APIDB = {
  situations: {
    dataConstName: 'situation',
    find: 'coach_id',
    collectionName: 'class_report',
    match: 'class_name._id',
    project: defaultProjects
  },
  students: {
    dataConstName: 'coach_id',
    find: 'class_id',
    collectionName: 'student_report',
    match: 'coaches_data._id',
    project: {
      ...defaultProjects,
      kelemhan: 1,
      kelemahan: 1,
      kekuatan: 1,
      peningkatan: 1,
    }
  },
  classes: {
    dataConstName: 'coach_id',
    find: '_id',
    collectionName: 'student_report',
    match: 'class_name._id',
    project: defaultProjects
  },
}
