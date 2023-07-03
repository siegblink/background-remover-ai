'use client';

import Dropzone from 'react-dropzone';
import { saveAs } from 'file-saver';
import { useState } from 'react';
import { FileRejection } from 'react-dropzone';
import { ThreeDots } from 'react-loader-spinner';
import { FaTrashAlt } from 'react-icons/fa';
import { FaDownload } from 'react-icons/fa';
import { XCircleIcon } from '@heroicons/react/20/solid';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { ImageAreaProps } from '@/types';

type ErrorNotificationProps = {
  errorMessage: string;
};

type ActionPanelProps = {
  isLoading: boolean;
  submitImage(): void;
};

type UploadedImageProps = {
  image: File;
  removeImage(): void;
};

type ImageOutputProps = ImageAreaProps & {
  loading: boolean;
  outputImage: string | null;
  downloadOutputImage(): void;
};

const acceptedFileTypes = {
  'image/jpeg': ['.jpeg', '.jpg', '.png'],
};

const maxFileSize = 5 * 1024 * 1024; // 5MB

function ErrorNotification({ errorMessage }: ErrorNotificationProps) {
  return (
    <div className='mx-4 mb-10 rounded-md bg-red-50 p-4 lg:mx-6 xl:mx-8'>
      <div className='flex'>
        <div className='flex-shrink-0'>
          <XCircleIcon className='h-5 w-5 text-red-400' aria-hidden='true' />
        </div>
        <div className='ml-3'>
          <p className='text-sm font-medium text-red-800'>{errorMessage}</p>
        </div>
      </div>
    </div>
  );
}

function ActionPanel({ isLoading, submitImage }: ActionPanelProps) {
  const isDisabled = isLoading;

  return (
    <div className='mx-4 bg-gray-900 shadow sm:rounded-lg lg:mx-6 xl:mx-8'>
      <div className='px-4 py-5 sm:p-6'>
        <div className='sm:flex sm:items-start sm:justify-between'>
          <div>
            <h3 className='text:base font-semibold leading-6 text-gray-300 lg:text-xl'>
              Upload a photo or image
            </h3>
            <div className='mt-2 max-w-xl text-sm text-gray-500'>
              <p>
                Upload any photo or image whose background you want to remove
              </p>
            </div>
          </div>
          <div className='mt-5 sm:ml-6 sm:mt-0 sm:flex sm:flex-shrink-0 sm:items-center'>
            <button
              type='button'
              disabled={isDisabled}
              onClick={submitImage}
              className={`${
                isDisabled
                  ? 'cursor-not-allowed bg-indigo-300 text-gray-300 hover:bg-indigo-300 hover:text-gray-300'
                  : 'bg-indigo-600 text-white'
              } inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm transition-all duration-300 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 lg:px-3.5 lg:py-2.5`}
            >
              Remove background
              <SparklesIcon className='ml-2 h-4 w-4 text-gray-300' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ImageOutput(props: ImageOutputProps) {
  return (
    <section className='relative w-full'>
      <button
        type='button'
        className={`${
          props.loading ? 'flex items-center justify-center' : ''
        } relative block h-full w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
      >
        {!props.outputImage && props.loading ? (
          <span className='flex flex-col items-center'>
            <ThreeDots
              height='50'
              width='60'
              color='#eee'
              ariaLabel='three-dots-loading'
              visible={props.loading}
            />
            <span className='block text-sm font-semibold text-gray-300'>
              Processing the output image
            </span>
          </span>
        ) : null}

        {!props.outputImage && !props.loading ? (
          <>
            <props.icon className='mx-auto h-12 w-12 text-gray-400' />
            <span className='mt-2 block text-sm font-semibold text-gray-300'>
              {props.title}
            </span>
          </>
        ) : null}

        {!props.loading && props.outputImage ? (
          <img
            src={props.outputImage}
            alt='output'
            className='h-full w-full object-cover'
          />
        ) : null}
      </button>

      {!props.loading && props.outputImage ? (
        <button
          onClick={props.downloadOutputImage}
          className='group absolute right-1 top-1 bg-yellow-500 p-2 text-black'
        >
          <FaDownload className='h-4 w-4 duration-300 group-hover:scale-110' />
        </button>
      ) : null}
    </section>
  );
}

function UploadedImage({ image, removeImage }: UploadedImageProps) {
  return (
    <section className='relative w-full'>
      <button className='relative block h-full w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
        <img
          src={URL.createObjectURL(image)}
          alt={image.name}
          className='h-full w-full object-cover'
        />
      </button>

      <button
        className='group absolute right-1 top-1 rounded bg-yellow-500 p-2 text-black'
        onClick={removeImage}
      >
        <FaTrashAlt className='h-4 w-4 duration-300 group-hover:scale-110' />
      </button>
    </section>
  );
}

function ImageDropzone(
  props: ImageAreaProps & {
    onImageDrop(acceptedFiles: File[], rejectedFiles: FileRejection[]): void;
  }
) {
  return (
    <Dropzone
      onDrop={props.onImageDrop}
      accept={acceptedFileTypes}
      maxSize={maxFileSize}
      multiple={false}
    >
      {({ getRootProps, getInputProps }) => (
        <>
          <input {...getInputProps()} />
          <button
            {...getRootProps()}
            type='button'
            className='relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          >
            <props.icon className='mx-auto h-12 w-12 text-gray-400' />
            <span className='mt-2 block text-sm font-semibold text-gray-300'>
              {props.title}
            </span>
          </button>
        </>
      )}
    </Dropzone>
  );
}

export default function HomePage() {
  const [outputImage, setOutputImage] = useState<string | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>('');
  const [file, setFile] = useState<File | null>(null);

  function onImageDrop(acceptedFiles: File[], rejectedFiles: FileRejection[]) {
    // Check if any of the uploaded files are not valid
    if (rejectedFiles.length > 0) {
      console.info(rejectedFiles);
      setError('Please upload a PNG or JPEG image less than 5MB.');
      return;
    }

    removeImage();

    console.info(acceptedFiles);
    setError('');
    setFile(acceptedFiles[0]);

    // Convert to base64
    convertImageToBase64(acceptedFiles[0]);
  }

  function convertImageToBase64(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const binaryStr = reader.result as string;
      setBase64Image(binaryStr);
    };
  }

  function removeImage() {
    setFile(null);
    setOutputImage(null);
  }

  function downloadOutputImage() {
    saveAs(outputImage as string, 'output.png');
  }

  async function submitImage() {
    if (!file) {
      setError('Please upload an image.');
      return;
    }

    setLoading(true);

    const response = await fetch('/api/replicate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: base64Image }),
    });

    const result = await response.json();
    console.log(result);

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    setOutputImage(result.output);
    setLoading(false);
  }

  return (
    <main className='flex min-h-screen flex-col py-10 lg:pl-72'>
      {error ? <ErrorNotification errorMessage={error} /> : null}

      <ActionPanel isLoading={loading} submitImage={submitImage} />

      <section className='mt-10 grid flex-1 gap-6 px-4 lg:px-6 xl:grid-cols-2 xl:gap-8 xl:px-8'>
        {!file ? (
          <ImageDropzone
            title={`Drag 'n drop your image here or click to upload`}
            onImageDrop={onImageDrop}
            icon={PhotoIcon}
          />
        ) : (
          <UploadedImage image={file} removeImage={removeImage} />
        )}

        <ImageOutput
          title={`AI-generated output goes here`}
          downloadOutputImage={downloadOutputImage}
          outputImage={outputImage}
          icon={SparklesIcon}
          loading={loading}
        />
      </section>
    </main>
  );
}
