import * as VTable from '../../src';
import { bindDebugTool } from '../../src/scenegraph/debug-tool';
const Table_CONTAINER_DOM_ID = 'vTable';

function generateRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
function generateRandomHobbies() {
  const hobbies = [
    'Reading books',
    'Playing video games',
    'Watching movies',
    'Cooking',
    'Hiking',
    'Traveling',
    'Photography',
    'Playing musical instruments',
    'Gardening',
    'Painting',
    'Writing',
    'Swimming'
  ];

  const numHobbies = Math.floor(Math.random() * 3) + 1; // 生成 1-3 之间的随机整数
  const selectedHobbies: string[] = [];

  for (let i = 0; i < numHobbies; i++) {
    const randomIndex = Math.floor(Math.random() * hobbies.length);
    const hobby = hobbies[randomIndex];
    selectedHobbies.push(hobby);
    hobbies.splice(randomIndex, 1); // 确保每个爱好只选一次
  }

  return selectedHobbies.join(', ');
}
function generateRandomBirthday() {
  const start = new Date('1970-01-01');
  const end = new Date('2000-12-31');
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  const year = randomDate.getFullYear();
  const month = randomDate.getMonth() + 1;
  const day = randomDate.getDate();
  return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
}
function generateRandomPhoneNumber() {
  const areaCode = [
    '130',
    '131',
    '132',
    '133',
    '134',
    '135',
    '136',
    '137',
    '138',
    '139',
    '150',
    '151',
    '152',
    '153',
    '155',
    '156',
    '157',
    '158',
    '159',
    '170',
    '176',
    '177',
    '178',
    '180',
    '181',
    '182',
    '183',
    '184',
    '185',
    '186',
    '187',
    '188',
    '189'
  ];
  const prefix = areaCode[Math.floor(Math.random() * areaCode.length)];
  const suffix = String(Math.random()).substr(2, 8);
  return prefix + suffix;
}
const generatePersons = count => {
  return Array.from(new Array(count)).map((_, i) => {
    const first = generateRandomString(10);
    const last = generateRandomString(4);
    return {
      id: i + 1,
      email1: `${first}_${last}@xxx.com`,
      name: first,
      lastName: last,
      hobbies: generateRandomHobbies(),
      birthday: generateRandomBirthday(),
      tel: generateRandomPhoneNumber(),
      sex: i % 2 === 0 ? 'boy' : 'girl',
      work: i % 2 === 0 ? 'back-end engineer' : 'front-end engineer',
      city: 'beijing'
    };
  });
};

export function createTable() {
  const records = generatePersons(1000000);
  const columns = [
    {
      field: 'id',
      caption: 'ID',
      width: 80,
      sort: true
    },
    {
      field: 'email1',
      caption: 'email',
      width: 250,
      sort: true
    },
    {
      field: 'full name',
      caption: 'Full name',
      columns: [
        {
          field: 'name',
          caption: 'First Name',
          width: 120
        },
        {
          field: 'lastName',
          caption: 'Last Name',
          width: 100
        }
      ]
    },
    {
      field: 'hobbies',
      caption: 'hobbies',
      width: 200
    },
    {
      field: 'birthday',
      caption: 'birthday',
      width: 120
    },
    {
      field: 'sex',
      caption: 'sex',
      width: 100
    },
    {
      field: 'tel',
      caption: 'telephone',
      width: 150
    },
    {
      field: 'work',
      caption: 'job',
      width: 200
    },
    {
      field: 'city',
      caption: 'city',
      width: 150
    }
  ];
  const option: VTable.TYPES.ListTableConstructorOptions = {
    container: document.getElementById(Table_CONTAINER_DOM_ID),
    records,
    columns,
    heightMode: 'autoHeight',
    autoWrapText: true
  };
  const tableInstance = new VTable.ListTable(option);
  (window as any).tableInstance = tableInstance;

  bindDebugTool(tableInstance.scenegraph.stage as any, {
    customGrapicKeys: ['role', 'row', 'col']
  });
}
