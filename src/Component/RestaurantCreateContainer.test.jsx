import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import { useSelector, useDispatch } from 'react-redux';

import RestaurantCreate from './RestaurantCreateContainer';

import {
  updateRestaurantInformation,
  addRestaurant,
} from '../actions';

jest.mock('react-redux');

describe('RestaurantCreate', () => {
  context('이름, 분류, 주소가 없는 경우', () => {
    const dispatch = jest.fn();

    const restaurant = {
      name: '',
      category: '',
      address: '',
    };

    beforeEach(() => {
      useDispatch.mockImplementation(() => dispatch);
      useSelector.mockImplementation((selector) => selector(restaurant));
      dispatch.mockClear();
    });

    it('입력 창과 등록 버튼을 보여준다', () => {
      const { getByTestId, getByText } = render((
        <RestaurantCreate />
      ));

      expect(getByTestId(/name/)).toBeInTheDocument();
      expect(getByTestId(/category/)).toBeInTheDocument();
      expect(getByTestId(/address/)).toBeInTheDocument();
      expect(getByText(/등록/)).toBeInTheDocument();
    });

    it('이름을 입력하면 updateRestaurantInformation 액션이 전달된다.', () => {
      const { getByTestId } = render((
        <RestaurantCreate />
      ));

      fireEvent.change(getByTestId(/name/), {
        target: { value: '불짬뽕' },
      });

      expect(dispatch).toBeCalledWith(updateRestaurantInformation('name', '불짬뽕'));
    });

    it('분류 정보를 입력하면 updateRestaurantInformation 액션이 전달된다.', () => {
      const { getByTestId } = render((
        <RestaurantCreate />
      ));

      fireEvent.change(getByTestId(/category/), {
        target: { value: '중식' },
      });

      expect(dispatch).toBeCalledWith(updateRestaurantInformation('category', '중식'));
    });

    it('주소 정보를 입력하면 updateRestaurantInformation 액션이 전달된다.', () => {
      const { getByTestId } = render((
        <RestaurantCreate />
      ));

      fireEvent.change(getByTestId(/address/), {
        target: { value: '천안' },
      });

      expect(dispatch).toBeCalledWith(updateRestaurantInformation('address', '천안'));
    });
  });

  context('이름, 분류, 주소가 있는 경우', () => {
    const restaurant = {
      name: '불짬뽕',
      category: '중식',
      address: '대구',
    };
    it('입력 창에 이름, 분류, 주소 정보가 입력되어있다.', () => {
      useSelector.mockImplementation((selector) => selector(restaurant));

      const { getByTestId } = render((
        <RestaurantCreate />
      ));

      expect(getByTestId(/name/)).toHaveValue('불짬뽕');
      expect(getByTestId(/category/)).toHaveValue('중식');
      expect(getByTestId(/address/)).toHaveValue('대구');
    });

    it('등록 버튼을 누르면 addRestaurant 액션이 전달된다.', () => {
      useSelector.mockImplementation((selector) => selector(restaurant));

      const dispatch = jest.fn();

      useDispatch.mockImplementation(() => dispatch);

      const { getByText } = render((
        <RestaurantCreate />
      ));

      fireEvent.click(getByText('등록'));

      expect(dispatch).toBeCalledWith(addRestaurant());
    });
  });
});