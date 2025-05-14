import { useState } from 'react';
import toast from 'react-hot-toast';

import useUpdateUserInfo from '@/hooks/api/users/useUpdateUserInfo';
import type { FormEditProfileType } from '@/interface';

const useEditProfile = () => {
  const [errors, setErrors] = useState<FormEditProfileType>({});
  const { mutate: updateUserInfo } = useUpdateUserInfo({
    onSuccess: () => {
      toast.success('프로필 수정이 완료되었습니다.');
    },
    onError: () => {
      toast.error('프로필 수정에 실패했습니다.');
    },
  });

  const validateField = (value?: string, fieldName?: string) => {
    const trimmedValue = value?.trim();

    if (!trimmedValue) {
      return `${fieldName}을(를) 입력해주세요.`;
    }

    return;
  };

  const handleSubmitEditProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const newErrors: typeof errors = {};

    const fields: { field: keyof FormEditProfileType; fieldName: string }[] = [
      { field: 'name', fieldName: '이름' },
      { field: 'phone', fieldName: '전화번호' },
      { field: 'address', fieldName: '주소' },
    ];

    fields.forEach(({ field, fieldName }) => {
      const error = validateField(data[field] as string, fieldName);

      if (error !== undefined) {
        newErrors[field] = error;
      }
    });

    const hasError = Object.keys(newErrors).length > 0;
    setErrors(newErrors);

    if (hasError) {
      const firstErrorField = Object.keys(newErrors)[0];
      document.getElementById(firstErrorField)?.focus();

      return;
    }

    const cleaningData = {
      name: (data.name as string).trim(),
      phone: (data.phone as string).trim(),
      email: (data.email as string).trim(),
      address: (data.address as string).trim(),
    };

    updateUserInfo(cleaningData);
  };

  return { handleSubmitEditProfile, errors };
};

export default useEditProfile;
