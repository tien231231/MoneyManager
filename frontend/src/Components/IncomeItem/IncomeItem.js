import React from 'react'
import { useState } from 'react';
import {Modal} from 'antd'
import styled from 'styled-components'
import { dateFormat } from '../../utils/dateFormat';
import { bitcoin,necessary,personal,long_term,education, book, calender, card, circle, clothing, comment, dollar, food, freelance, medical, money, piggy, stocks, takeaway, trash, tv, users, yt } from '../../utils/Icons';
import Button from '../Button/Button';
import UpdateForm from '../Form/UpdateForm';



function IncomeItem({
    id,
    title,
    amount,
    date,
    category,
    description,
    deleteItem,
    updateItem,
    indicatorColor,
    type
}) {

    const categoryIcon = () =>{
        switch(category) {
            case 'necessary':
                return necessary;
            case 'personal':
                return personal;
           
            case 'education':
                return education;
            case 'long_term':
                return long_term;
            
            case 'other':
                return circle;
            default:
                return ''
        }
    }

    const expenseCatIcon = () => {
        switch (category) {
            case 'necessary':
                return necessary;
            case 'personal':
                return personal;
           
            case 'education':
                return education;
            case 'long_term':
                return long_term;
            
            case 'other':
                return circle;
            default:
                return ''
        }
    }
   
    const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
    
  
const handleupdate = () =>{
    setOpen(true);
        console.log(id)
    }
  const handleOk = () => {
    
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
   
    setOpen(false);setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
      }, 0);
  };
   
    return (
        <IncomeItemStyled indicator={indicatorColor} onClick={handleupdate}>
           <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <UpdateForm id={id} T={type} />
      </Modal>
            <div className="icon">
                {type === 'expense' ? expenseCatIcon() : categoryIcon()}
            </div>
            <div className="content">
            
                <h5>{title}</h5>
                <div className="inner-content">
                    <div className="text">
                        <p>{dollar} {amount}</p>
                        <p>{calender} {dateFormat(date)}</p>
                        <p>
                            {comment}
                            {description}
                        </p>
                    </div>
                    <div className="btn-con">
                        <Button 
                            icon={trash}
                            bPad={'1rem'}
                            bRad={'50%'}
                            bg={'var(--primary-color'}
                            color={'#fff'}
                            iColor={'#fff'}
                            hColor={'var(--color-green)'}
                            onClick={() => deleteItem(id)}
                        />
                         
                    </div>
                </div>
            </div>
            
        </IncomeItemStyled>
    )
}

const IncomeItemStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    color: #222260;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    &:hover {
        transform: scale(0.98);
        border-radius: 20px;
        
    }
    .icon{
        width: 80px;
        height: 80px;
        border-radius: 20px;
        background: #F5F5F5;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #FFFFFF;
        i{
            font-size: 2.6rem;
        }
    }
    

    .content{
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: .2rem;
        h5{
            font-size: 1.3rem;
            padding-left: 2rem;
            position: relative;
            &::before{
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: .8rem;
                height: .8rem;
                border-radius: 50%;
                background: ${props => props.indicator};
            }
        }

        .inner-content{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .text{
                display: flex;
                align-items: center;
                gap: 1.5rem;
                p{
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--primary-color);
                    opacity: 0.8;
                }
            }
        }
    }
`;

export default IncomeItem