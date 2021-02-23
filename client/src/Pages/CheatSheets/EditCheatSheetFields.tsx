import TextInput from 'Pages/Common/Inputs/TextInput';
import UploadInput from 'Pages/Common/Inputs/UploadInput';
import React, { ReactElement } from 'react';
import { CheatSheet as CheatSheetType, NewCheatSheet } from 'Types';

const newCheatSheet: NewCheatSheet = {
  title: '',
  version: '',
  tags: [],
  fileName: '',
};

interface EditCheatSheetFieldsType {
  cheatSheetData?: CheatSheetType | NewCheatSheet;
}

EditCheatSheetFields.defaultProps = { cheatSheetData: newCheatSheet };

export default function EditCheatSheetFields({
  cheatSheetData = newCheatSheet,
}: EditCheatSheetFieldsType): ReactElement {
  // TODO: allow upload of course image
  return (
    <>
      <TextInput
        required
        fieldName="title"
        defaultValue={cheatSheetData.title}
      />
      <TextInput
        required
        fieldName="version"
        defaultValue={cheatSheetData.version}
      />
      <UploadInput
        required
        fieldName="fileName"
        defaultValue={cheatSheetData.fileName}
      />
    </>
  );
}
