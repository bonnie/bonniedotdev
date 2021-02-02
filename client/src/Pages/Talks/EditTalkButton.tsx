import EditItemModal from 'Pages/Common/Modals/EditItemModal';
import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';

import EditTalkFields from './EditTalkFields';
import { editTalk } from './Redux/Actions';
import { TalkType } from './Types';

interface editTalkButtonsProps {
  id: number;
  talkData: TalkType;
}

export default function EditTalkButtons({
  id,
  talkData,
}: editTalkButtonsProps): ReactElement {
  const dispatch = useDispatch();

  return (
    <EditItemModal
      handleSave={(data) => dispatch(editTalk(data, talkData))}
      itemString="Talk"
      ItemFields={<EditTalkFields talkData={talkData} />}
      id={id}
    />
  );
}
