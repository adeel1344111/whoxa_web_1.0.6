import React, { useState, useEffect } from 'react';
import useApiPost from '../../../hooks/PostData'; // Adjust the path as necessary
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import toast from 'react-hot-toast';

function EditPrivacyPolicy() {
    const [privacyPolicyContent, setPrivacyPolicyContent] = useState<string>('');
    const [settingId, setSettingId] = useState<number>(0);
    const [initialPrivacyPolicyContent, setInitialPrivacyPolicyContent] = useState<string>('');
    const [isDirty, setIsDirty] = useState(false);
    const { loading, error, postData } = useApiPost(); // Destructure the hook
    const [updateFlag, setUpdateFlag] = useState(false);

    useEffect(() => {
        // Fetch existing settings when the component mounts
        const fetchSettings = async () => {
            try {
                const response = await postData('get-privacy-policy');

                if (response.success) {
                    const settings = response.privacy_policy;

                    if (settings && settings.length > 0) {
                        const { Link, id } = settings[0];
                        setPrivacyPolicyContent(Link);
                        setInitialPrivacyPolicyContent(Link);
                        setSettingId(id);
                    }
                }
            } catch (err) {
                console.error('Failed to fetch privacy policy settings:', err);
            }
        };

        fetchSettings();
    }, [updateFlag]);

    useEffect(() => {
        // Check if the content has changed
        setIsDirty(privacyPolicyContent !== initialPrivacyPolicyContent && privacyPolicyContent !== '');
    }, [privacyPolicyContent, initialPrivacyPolicyContent]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('id', settingId.toString());
        formData.append('Link', privacyPolicyContent); // Adjust key if needed

        try {
            const response = await postData('edit-privacy-policy', formData);
            if (response.success) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Privacy policy updated successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
                setUpdateFlag(!updateFlag); // Trigger update
            }
        } catch (err) {
            console.error('Failed to update privacy policy settings:', err);
        }
    };

    return (
        <div className="mt-6">
            <form onSubmit={handleSubmit} className="mt-6 space-y-5 ">
                <div>
                    <label htmlFor="privacyPolicyContent" className='text-2xl text-dark mb-3'>Privacy Policy</label>
                    <ReactQuill
                        theme="snow"
                        value={privacyPolicyContent}
                        onChange={setPrivacyPolicyContent}
                        placeholder="Enter the privacy policy"
                        className='panel'
                    />
                </div>

                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">Failed to update privacy policy. Please try again.</p>}

                <button type="submit" className="btn btn-primary !mt-2 btn-md" disabled={!isDirty}>
                    Submit
                </button>
            </form>
        </div>
    );
}

export default EditPrivacyPolicy;
