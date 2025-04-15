import React from "react";

export const AddPage = () =>
{
  const [ formData, setFormData ] = React.useState( {
    name: "",
    email: "",
    message: "",
  } );

  const handleChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) =>
  {
    setFormData( {
      ...formData,
      [ e.target.name ]: e.target.value,
    } );
  };

  const handleSubmit = ( e: React.FormEvent ) =>
  {
    e.preventDefault();
    console.log( "Form submitted:", formData );
    // you can add your submission logic here
  };

  return (
    <div className="h-full flex flex-col rounded-md">
      <div className="bg-white h-full flex flex-col rounded-md mt-5">
        <form action="">
          <div className="grid grid-cols-12 gap-5 h-auto">
            <div className="col-span-6">
              <div className="mb-3">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={ formData.name }
                  onChange={ handleChange }
                  required
                />
              </div>
            </div>
          </div>
      </form>
      </div>
    </div>
  )
}

