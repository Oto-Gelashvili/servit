'use client';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Dictionary, Locale } from '../../../../get-dictionaries';

interface ContactFormProps {
  email: string;
  dictionary: Dictionary['footer'];
  lang: Locale;
}

interface FormData {
  message: string;
}

export default function ContactForm({
  email,
  dictionary,
  lang,
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();
  const handleClearSubmitStatus = () => {
    setSubmitStatus('');
  };
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          message: data.message,
          lang,
        }),
      });

      if (response.ok) {
        setSubmitStatus(dictionary.successMsg);
        reset();
      } else {
        const errorData = await response.json();
        setSubmitStatus(errorData.message || dictionary.failMsg);
      }
    } catch (error) {
      setSubmitStatus(dictionary.errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="relative" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          type="text"
          id="message"
          {...register('message', {
            required: dictionary.MessageReq,
            minLength: {
              value: 10,
              message: `${dictionary.MessageMinLength}`,
            },
            onChange: () => {
              if (submitStatus) {
                setSubmitStatus('');
              }
            },
          })}
          className={`messageArea ${errors.message ? 'border-red-500' : ''}`}
          placeholder={dictionary.placeholderMsg}
        ></input>
        {errors.message && <p className="errorMsg">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        onClick={handleClearSubmitStatus}
        disabled={isSubmitting}
        className={`submitBtn`}
      >
        {isSubmitting ? dictionary.sending : dictionary.send}
      </button>

      {submitStatus && (
        <p
          className={`submitStatus ${
            submitStatus.includes('შეტყობინება გაიგზავნა') ||
            submitStatus.includes('Message was sent')
              ? 'text-[#44bba4] ]'
              : 'text-[#dc2626] '
          }`}
        >
          {submitStatus}
        </p>
      )}
    </form>
  );
}
