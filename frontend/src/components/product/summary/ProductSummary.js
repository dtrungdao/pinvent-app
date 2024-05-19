import React, { useEffect } from 'react'
import './ProductSummary.scss'
import { TbCategory2,TbDevicesCheck, TbDevicesX } from "react-icons/tb";
import SummaryBoard from '../../summaryBoard/SummaryBoard';
import { useDispatch, useSelector } from 'react-redux';
import { CALC_CATEGORY, selectCategory } from '../../../redux/features/product/productSlice';


//Adjusted icons in the board
const categoryIcon = <TbCategory2 size={40} color='#fff' />;
const deviceIcon = <TbDevicesCheck size={40} color='#fff' />;
const deviceXIcon = <TbDevicesX size={40} color='#fff' />;

const ProductSummary = ({products}) => {
    const dispatch = useDispatch();
    const category = useSelector(selectCategory)

    useEffect(() => {
      dispatch(CALC_CATEGORY(products))
    }, [dispatch, products]);

  return (
    <div className='product-summary'>
        <h2 className='--mt'>Overview</h2>
        <div className='info-summary'>
            <SummaryBoard icon={categoryIcon} title = {"Category"} 
            count={category.length} bgColor="card1" />
            <SummaryBoard icon={deviceIcon} title = {"All products"} 
            count={products.length} bgColor="card2" />
            <SummaryBoard icon={deviceXIcon} title = {"Out of stock"} 
            count={products.length} bgColor="card3" />
        </div>
    </div>
  )
}

export default ProductSummary