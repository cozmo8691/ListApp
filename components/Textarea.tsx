const Textarea = ({
  name,
  value,
  label,
  handleChange,
  placeholder = "",
}: {
  name: string;
  value: string;
  label: string;
  type?: string;
  handleChange: any;
  placeholder?: string;
}) => {
  return (
    <div className="form-group mb-6">
      <label
        htmlFor={name}
        className="form-label inline-block mb-2 text-gray-700">
        {label}
      </label>
      <textarea
        id={name}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
        focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        rows={3}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Textarea;
