import withLoading from 'components/HOC/withLoading'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import EditProductForm from './EditProductForm'
import adminApi from 'api/adminApi'

function EditProductContainer({ data, showLoading, hideLoading }) {
  const [product, setProduct] = useState()

  const mapData = (d) => {
    const dataMap = {
      name: d.name,
      price: d.price,
      content: d.content,
      description: d.description,
      category_id: d.category.id,
      feature: d.feature === 'Yes' ? 1 : 0,
      sale: d.discount === 'No' ? 0 : parseFloat(d.discount.slice(0, -1) / 100),
      images: d.images?.[0].url,
      date_update: d.date_update,
    }
    setProduct(dataMap)
  }

  useEffect(() => {
    data && mapData(data)
  }, [data])

  const handleSubmit = async (formData) => {
    showLoading('top')
    try {
      const rs = await adminApi.editProduct(data.id, formData)
      if (rs.status === 200 && rs.success) {
        toast.success('Chỉnh sửa thành công!')
      }
    } catch (err) {
      toast.error('Error')
    }
    hideLoading()
  }

  return <EditProductForm onSubmit={handleSubmit} product={product} />
}

export default withLoading(EditProductContainer)
