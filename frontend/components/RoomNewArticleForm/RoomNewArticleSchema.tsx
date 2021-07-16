import * as yup from 'yup';
const FILE_SIZE = 5000000;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

const schema = yup.object().shape({
  roomId: yup.number().required('Wybierz pokój.'),
  title: yup
    .string()
    .trim()
    .required('Tytuł jest wymagany.')
    .min(10, 'Tytuł min. 10 znaków.')
    .max(150, 'Zbyt długi tytuł.'),
  description: yup
    .string()
    .trim()
    .required('Opis jest wymagany.')
    .min(10, 'Opis min. 10 znaków.')
    .max(350, 'Zbyt długi opis.'),
  body: yup
    .string()
    .trim()
    .required('Treść jest wymagana.')
    .min(10, 'Trść min. 10 znaków.'),
  photo: yup
    .mixed()
    .notRequired()
    .test('fileSize', 'Rozmiar zdjęcia max 5mb.', (value) => {
      if (!value || !value.length) return true;
      if (value.length) return value[0].size <= FILE_SIZE;
    })
    .test('fileType', 'Zły format pliku.', (value) => {
      if (!value || !value.length) return true;
      if (value.length) return SUPPORTED_FORMATS.includes(value[0].type);
    }),
});

export default schema;
