import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import UploadInput from '../UploadInput';

test('upload modal appears and disappears as expected', async () => {
  // note: this only tests the dialog appearance / disappearance;
  // file upload will be fully tested in e2e testing

  render(<UploadInput fieldName="test" defaultValue="" required />);

  // open upload modal
  const fileInput = screen.getByRole('textbox', { name: 'test' });
  userEvent.click(fileInput);

  // check that modal appears with file upload input
  const inputUpload = await screen.findByLabelText(/upload/i);
  expect(inputUpload).toBeVisible();

  // check for upload progress bar, which will be since there's no active upload
  const progressBar = screen.getByRole('progressbar', { hidden: true });
  expect(progressBar).toBeInTheDocument();

  // click cancel to close
  const cancelButton = screen.getByRole('button', { name: /cancel/i });
  userEvent.click(cancelButton);
  expect(inputUpload).not.toBeVisible();
});
