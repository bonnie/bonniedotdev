import AddItemModal from 'Pages/Common/Modals/AddItemModal';
import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';

import EditTalkFields from './EditTalkFields';
import { addTalk } from './Redux/Actions';

export default function AddTalkButton(): ReactElement {
  const dispatch = useDispatch();
  return (
    <AddItemModal
      handleSave={(talkData) => dispatch(addTalk(talkData))}
      itemString="Talk"
      ItemFields={<EditTalkFields />}
    />
  );
}
