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
import { convertToRaw, convertFromHTML, ContentState } from 'draft-js';

function EditProductForm({ onSubmit, product }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [isEditImg, setIsEditImg] = useState(false);
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
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    product &&
      form.reset({
        name: product.name,
        price: product.price,
        content: product.content,
        category_id: product.category_id,
        feature: product.feature,
        sale: product.sale,
      });
    product &&
      product.images &&
      setImgProduct({
        preview: product.images,
      });

    if (product) {
      const blocksFromHTML = convertFromHTML(product.description);
      const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      setEditorState(EditorState.createWithContent(state));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  // const handleImgChange = () => {
  //   const file = imgRef.current.files[0];
  // };

  const handleInputImgChange = () => {
    setIsEditImg(true);
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

    if (isEditImg) {
      const file =
        imgRef.current && imgRef.current.files && imgRef.current.files[0];
      if (!file) {
        setErrorImage('Please enter product image');
        return;
      }
      formData.append('images', imgRef.current.files[0]);
    }
    if (!onSubmit) return;
    onSubmit(formData);
    // form.reset({
    //   name: '',
    //   price: '',
    //   content: '',
    //   category_id: 1,
    //   feature: 0,
    //   sale: 0,
    // });
    // imgRef.current.value = '';
    // setEditorState(EditorState.createEmpty());
    // setImgProduct(null);
  };
  return (
    <div className='create-product'>
      <h3>Chỉnh sửa sản phẩm</h3>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField
          placeholder='Phong tê thấp Bà Giằng'
          name='name'
          form={form}
          label='Nhập tên sản phẩm'
        />
        <InputField
          placeholder='230000'
          name='price'
          form={form}
          label='Nhập giá sản phẩm'
        />
        <TextAreaField
          placeholder='Công Dụng: Phong tê thấp Bà Giằng ...'
          name='content'
          form={form}
          label='Nhập nội dung sản phẩm'
        />
        <TextEditor
          label='Nhập mô tả sản phẩm'
          state={editorState}
          onChange={(values) => {
            setEditorState(values);
          }}
        />
        <CategoryField label='Chọn danh mục' form={form} name='category_id' />
        <GenderField
          label='Nổi bật'
          form={form}
          name='feature'
          title={['Có', 'Không']}
        />
        <InputField
          placeholder='0.15'
          name='sale'
          form={form}
          label='Giảm giá'
          type='number'
        />
        <div
          className='input-field'
          style={{
            margin: '10px 0 0',
          }}
        >
          <p>Chọn ảnh</p>
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
          {imgProduct && (
            <img
              style={{
                marginTop: '10px',
              }}
              width={'25%'}
              src={imgProduct.preview}
              alt=''
            />
          )}
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
          Chỉnh sửa sản phẩm
        </button>
      </form>
    </div>
  );
}

export default EditProductForm;
