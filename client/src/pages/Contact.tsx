import { Formik } from 'formik'
import emailjs from '@emailjs/browser';

const Contact = () => {

  const onOpen = (type: 'success' | 'error', message: string) => {
    alert(`${type.toUpperCase()}: ${message}`);
  };
  return (
    <section className='w-11/12 mx-auto'>
      <Formik initialValues={{
        name: "",
        email: "",
        message: "",
      }}
        onSubmit={async (values, { resetForm }) => {
          try {
            await emailjs.send(
              import.meta.env.VITE_EMAILJS_SERVICE_ID,
              import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
              {
                from_name: values.name,
                from_email: values.email,
                message: values.message,
                to_email: 'caroline.fzhang@gmail.com'
              },
              import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );
            onOpen('success', `Thank you ${values.name}! Your message has been sent.`);
            resetForm();
          } catch (error) {
            onOpen('error', 'Failed to send message. Please try again.');
          }
        }}>
        {({ values, handleChange, handleSubmit, isSubmitting }) => (
          <>
            <h1 className='text-3xl font-bold m-4 tracking-widest text-center'>Contact Me</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>

              <div>
                <label className='block text-sm font-medium mb-1' htmlFor='name'>Name</label>
                <input type='text' id='name' name='name' className='w-full border border-slate-300 p-2 rounded' value={values.name}
                  onChange={handleChange} />
              </div>
              <div>
                <label className='block text-sm font-medium mb-1' htmlFor='email'>Email</label>
                <input type='email' id='email' name='email' className='w-full border border-slate-300 p-2 rounded' value={values.email}
                  onChange={handleChange} />
              </div>
              <div>
                <label className='block text-sm font-medium mb-1' htmlFor='message'>Message</label>
                <textarea id='message' name='message' className='w-full border border-slate-300 p-2 rounded h-40' value={values.message}
                  onChange={handleChange}></textarea>
              </div>
              <button type='submit' disabled={isSubmitting} className='bg-slate-500 text-white px-4 py-2 rounded hover:bg-slate-700 disabled:opacity-50'>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </>
        )}
      </Formik>
    </section>
  )
}

export default Contact
