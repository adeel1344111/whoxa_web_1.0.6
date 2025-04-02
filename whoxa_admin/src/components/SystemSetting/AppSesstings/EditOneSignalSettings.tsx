import React, { useState, useEffect, useRef } from 'react';
import useApiPost from '../../../hooks/PostData'; // Adjust the path as necessary
import Swal from 'sweetalert2';
import { useParams, Link } from 'react-router-dom';
import EditGroupSettings from '../GroupSetting/EditGroupSetting';
import EditGogleMapSettings from './EditGogleMapSetting';
import toast from 'react-hot-toast';

interface EditOneSignalSettingsProps {
    setting_id: number; // Change to accept setting_id as a prop
}

function EditOneSignalSettings() {
  const [TWILIO_ACCOUNT_SID, setTWILIO_ACCOUNT_SID] = useState('');
  const [TWILIO_AUTH_TOKEN, setTWILIO_AUTH_TOKEN] = useState('');
  const [TWILIO_FROM_NUMBER, setTWILIO_FROM_NUMBER] = useState('');
  const [initialValues, setInitialValues] = useState({
    TWILIO_ACCOUNT_SID: '',
    TWILIO_AUTH_TOKEN: '',
    TWILIO_FROM_NUMBER: '',
  });
  const [isDirty, setIsDirty] = useState(false);
  const { loading, error, postData } = useApiPost();
  const [setting_id, setSetting_id] = useState<number | undefined>();
  const [updateFlag, setUpdateFlag] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await postData('get-website-settings', {});
        if (response.success) {
          const settings = response.settings[0];
          if (settings) {
            const { setting_id, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER } = settings;

            setTWILIO_ACCOUNT_SID(TWILIO_ACCOUNT_SID);
            setTWILIO_AUTH_TOKEN(TWILIO_AUTH_TOKEN);
            setTWILIO_FROM_NUMBER(TWILIO_FROM_NUMBER);
            setSetting_id(setting_id);

            // Set initial values for comparison
            setInitialValues({
              TWILIO_ACCOUNT_SID,
              TWILIO_AUTH_TOKEN,
              TWILIO_FROM_NUMBER,
            });
          }
        }
      } catch (err) {
        console.error('Failed to fetch Twilio settings:', err);
      }
    };

    fetchSettings();
  }, [updateFlag]);

  useEffect(() => {
    // Check if any field has changed
    const hasChanges =
      TWILIO_ACCOUNT_SID !== initialValues.TWILIO_ACCOUNT_SID ||
      TWILIO_AUTH_TOKEN !== initialValues.TWILIO_AUTH_TOKEN ||
      TWILIO_FROM_NUMBER !== initialValues.TWILIO_FROM_NUMBER;

    setIsDirty(hasChanges);
  }, [TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
 
    const formData = new FormData();
    formData.append('TWILIO_ACCOUNT_SID', TWILIO_ACCOUNT_SID);
    formData.append('TWILIO_AUTH_TOKEN', TWILIO_AUTH_TOKEN);
    formData.append('TWILIO_FROM_NUMBER', TWILIO_FROM_NUMBER);
    formData.append('setting_id', setting_id?.toString() || '');

    try {
      const response = await postData('edit-website-setting', {
        TWILIO_ACCOUNT_SID,
        TWILIO_AUTH_TOKEN,
        TWILIO_FROM_NUMBER,
        setting_id,
      });
      if (response.success) {
        Swal.fire({
          title: 'Success!',
          text: 'Twilio settings updated successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        setUpdateFlag(!updateFlag); // Trigger re-fetch
      }
    } catch (err) {
      console.error('Failed to update Twilio settings:', err);
    }
  };

  return (
    <div className="mt-6">
      <ul className="flex space-x-2 rtl:space-x-reverse text-sm text-gray-700">
        <li>
          <Link to="#" className="text-blue-500 hover:underline">
            System Settings
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2 text-gray-500">
          <span>SMS Configuration</span>
        </li>
      </ul>
      <div className="text-2xl text-dark mb-3 mt-3">SMS Configuration</div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5 panel">
        <div>
          <label htmlFor="TWILIO_ACCOUNT_SID" className="font-bold">
            Twilio Account SID
          </label>
          <input
            id="TWILIO_ACCOUNT_SID"
            type="text"
            value={TWILIO_ACCOUNT_SID}
            onChange={(e) => setTWILIO_ACCOUNT_SID(e.target.value)}
            placeholder="Enter Twilio Account SID"
            className="form-input"
            required
          />
        </div>
        <div>
          <label htmlFor="TWILIO_AUTH_TOKEN" className="font-bold">
            Twilio Auth Token
          </label>
          <input
            id="TWILIO_AUTH_TOKEN"
            type="text"
            value={TWILIO_AUTH_TOKEN}
            onChange={(e) => setTWILIO_AUTH_TOKEN(e.target.value)}
            placeholder="Enter Twilio Auth Token"
            className="form-input"
            required
          />
        </div>
        <div>
          <label htmlFor="TWILIO_FROM_NUMBER" className="font-bold">
            Twilio Phone Number
          </label>
          <input
            id="TWILIO_FROM_NUMBER"
            type="text"
            value={TWILIO_FROM_NUMBER}
            onChange={(e) => setTWILIO_FROM_NUMBER(e.target.value)}
            placeholder="Enter Twilio Phone Number"
            className="form-input"
            required
          />
        </div>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">Failed to update Twilio settings. Please try again.</p>}

        <button type="submit" className="btn btn-primary !mt-6" disabled={!isDirty}>
          Submit
        </button>
      </form>
    </div>
  )
}
export default EditOneSignalSettings;
