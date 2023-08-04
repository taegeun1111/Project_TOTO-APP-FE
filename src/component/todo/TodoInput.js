import React, {useRef, useState} from 'react';
import {MdAdd} from 'react-icons/md';
import cn from 'classnames';

import './scss/TodoInput.scss';

const TodoInput = ({addTodo}) => {

  const inputVal = useRef();

  // 입력창이 열리는 여부를 표현하는 상태값
  const [open, setOpen] = useState(false);

  // 할일 입력창에 입력한 내용을 표현하는 상태값
  const [todoText, setTodoText] = useState('');

  // + 버튼 클릭시 이벤트 처리
  const onToggle = () => {
    setOpen(!open);
  };

  // 서브밋 이벤트 핸들러
  const submitHandler = e => {
    e.preventDefault(); // 태그의 기본기능 제한

    console.log(inputVal.current.value)

    if (inputVal.current.value.length > 20 || inputVal.current.value.length <= 2) {
      alert("글자 수는 2에서 20글자 사이여야 합니다.");
      return;
    }

    // console.log(todoText);
    addTodo(todoText);

    // 입력이 끝나면 입력창 비우기
    setTodoText('');
  };

  // input change 이벤트 핸들러 함수
  const todoChangeHandler = e => {
    // console.log(e.target.value);

    setTodoText(e.target.value);
  };

  return (
    <>
      {
        open && (<div className='form-wrapper'>
          <form className='insert-form' onSubmit={submitHandler}>
            <input
              type='text'
              placeholder='할 일을 입력 후, 엔터를 누르세요!'
              onChange={todoChangeHandler}
              autoFocus
              value={todoText}
              ref={inputVal}
            />
          </form>
        </div>)
      }

      {/*
            cn() : 첫번째 파라미터는 항상 유지할 클래스
                    두번째 파라미터는 논리 상태값
                    => 논리상태값이 true일경우 해당클래스가 추가
                       false일 경우 제거
        */}
      <button className={cn('insert-btn', {open})} onClick={onToggle}>
        <MdAdd/>
      </button>

    </>
  )
};

export default TodoInput