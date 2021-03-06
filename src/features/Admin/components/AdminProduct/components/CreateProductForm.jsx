import { yupResolver } from '@hookform/resolvers/yup';
import InputField from 'components/form-controls/InputField';
import TextAreaField from 'components/form-controls/TextAreaField';
import CategoryField from 'components/form-controls/CategoryField';
import GenderField from 'components/form-controls/GenderField';
import TextEditor from 'components/form-controls/TextEditor';
import { EditorState } from 'draft-js';
import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';

function CreateProductForm(props) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [imgProduct, setImgProduct] = useState();
  const imgRef = useRef();
  const [errorImage, setErrorImage] = useState(null);
  const schema = yup.object().shape({
    name: yup.string().required('Please enter product name'),
    price: yup
      .number()
      .required('Please enter product price')
      .typeError('Please enter product price'),
    content: yup.string().required('Please enter product content'),
    category_id: yup
      .number()
      .required('Please enter product category')
      .typeError('Please enter product category'),
    feature: yup
      .number()
      .required('Please enter product feature')
      .typeError('Please enter product feature'),
    sale: yup
      .number()
      .required('Please enter product feature')
      .typeError('Please enter product feature')
      .max(1)
      .min(0),
  });

  const form = useForm({
    defaultValues: {
      name: '',
      price: '',
      content: '',
      category_id: 1,
      feature: 0,
      sale: 0,
    },
    resolver: yupResolver(schema),
  });

  // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));

  // const handleImgChange = () => {
  //   const file = imgRef.current.files[0];
  // };

  const handleInputImgChange = () => {
    const file = imgRef.current.files[0];
    file.preview = URL.createObjectURL(file);
    setImgProduct(file);
  };

  useEffect(() => {
    return () => {
      imgProduct && URL.revokeObjectURL(imgProduct.preview);
    };
  }, [imgProduct]);

  const handleSubmit = (values) => {
    const file =
      imgRef.current && imgRef.current.files && imgRef.current.files[0];
    if (!file) {
      setErrorImage('Please enter product image');
      return;
    }
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('price', values.price);
    formData.append('content', values.content);
    formData.append(
      'description',
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
    formData.append('category_id', values.category_id);
    formData.append('feature', values.feature);
    formData.append('sale', values.sale);
    formData.append('images', imgRef.current.files[0]);
    if (!props.onSubmit) return;
    props.onSubmit(formData);
    form.reset({
      name: '',
      price: '',
      content: '',
      category_id: 1,
      feature: 0,
      sale: 0,
    });
    imgRef.current.value = '';
    setEditorState(EditorState.createEmpty());
    setImgProduct(null);
  };
  return (
    <div className='create-product'>
      <h3>T???o m???i s???n ph???m</h3>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField
          placeholder='Phong t?? th???p B?? Gi???ng'
          name='name'
          form={form}
          label='Nh???p t??n s???n ph???m'
        />
        <InputField
          placeholder='230000'
          name='price'
          form={form}
          label='Nh???p gi?? s???n ph???m'
        />
        <TextAreaField
          placeholder='C??ng D???ng: Phong t?? th???p B?? Gi???ng ...'
          name='content'
          form={form}
          label='Nh???p n???i dung s???n ph???m'
        />
        <TextEditor
          label='Nh???p m?? t??? s???n ph???m'
          state={editorState}
          onChange={(values) => setEditorState(values)}
        />
        <CategoryField label='Ch???n danh m???c' form={form} name='category_id' />
        <GenderField
          label='N???i b???t'
          form={form}
          name='feature'
          title={['C??', 'Kh??ng']}
        />
        <InputField
          placeholder='0.15'
          name='sale'
          form={form}
          label='Gi???m gi??'
          type='number'
        />
        <div
          className='input-field'
          style={{
            margin: '10px 0 0',
          }}
        >
          <p>Ch???n ???nh</p>
          <input
            ref={imgRef}
            type='file'
            id='img'
            name='img'
            accept='image/*'
            style={{
              cursor: 'pointer',
            }}
            onChange={handleInputImgChange}
          />
          {imgProduct && <img width={'25%'} src={imgProduct.preview} alt='' />}
          {errorImage && (
            <span
              style={{
                fontSize: '12px',
                margin: '6px 0 0',
                display: 'block',
                color: '#ff0000',
              }}
            >
              {errorImage}
            </span>
          )}
        </div>
        <button
          style={{
            marginTop: '20px',
            width: '100%',
            padding: '6px',
            cursor: 'pointer',
            border: 'none',
            borderRadius: '6px',
            color: '#fff',
            backgroundColor: 'rgb(1, 173, 171)',
            '&:hover': {
              opacity: '0.8',
            },
          }}
        >
          Th??m s???n ph???m
        </button>
      </form>
    </div>
  );
}

export default CreateProductForm;
