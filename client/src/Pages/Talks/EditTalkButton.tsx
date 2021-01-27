import EditItemModal from 'Pages/Common/EditItemModal';
import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';

import EditTalkFields from './EditTalkFields';
import { editTalk } from './Redux/Actions';

interface editTalkButtonsProps {id: number}

export default function EditTalkButtons({ id }: editTalkButtonsProps): ReactElement {
  const dispatch = useDispatch();

  return (
    <EditItemModal
      handleSave={(talkData) => dispatch(editTalk(talkData))}
      itemString="Talk"
      ItemFields={<EditTalkFields />}
      id={id}
    />
  );
}
