import { Link } from "react-router-dom";
import {
  useState,
  type ChangeEvent,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";

interface Props<T> {
  title: string;
  description: string;
  inputs: Array<{
    label: string;
    placeholder?: string;
    type: string;
    name: string;
  }>;
  btn: string;
  footer: { description: string; link: { url: string; content: string } };
  data: T
  setData: Dispatch<SetStateAction<T>>;
  onsubmitHandler?: (data: T) => Promise<void>; 
  isLoading?: boolean
}

const AuthForm = <T extends object>({
  title,
  description,
  inputs,
  btn,
  footer,
  setData,
  onsubmitHandler,
}: Props<T>) => {
  const [formData, setFormData] = useState<T>({} as T);

  const dataHandiling = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files, type } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files?.[0] : value,
    }));
      setData((prev) => ({
      ...prev,
      [name]: type === "file" ? files?.[0] : value,
    }));
  };


const sendData = async (event: FormEvent) => {
  event.preventDefault();
  
  try {
    if (typeof onsubmitHandler === 'function') {
      await onsubmitHandler(formData);
    } else {
      setData(formData);
    }
  } catch (error) {
    console.error('Submission error:', error);
  }
};

  return (
    <form
      className="
        w-full max-w-md mx-auto
        p-4 md:p-6 lg:p-8
        rounded-3xl bg-white
        text-center flex flex-col
        min-h-[400px] md:min-h-[500px]
        shadow-lg
      "
      onSubmit={sendData}
    >
      <h1 className="font-extrabold text-xl sm:text-2xl mb-2">{title}</h1>
      <p className="mb-4 sm:mb-8 text-sm sm:text-base">{description}</p>

      <div className="flex flex-col justify-between flex-1">
        <div className="space-y-3 sm:space-y-4">
          {inputs.map((input, index) => (
            <div key={index}>
              <label
                className="block text-start text-sm sm:text-base"
                htmlFor={"input" + index}
              >
                {input.type !== "file" ? (
                  input.label
                ) : (
                  <img src={input.label} alt="" className="max-w-full h-auto" />
                )}
              </label>
              <input
                defaultValue=""
                type={input.type}
                className={` block w-full
                  h-10 sm:h-12
                  mb-3 sm:mb-4
                  rounded-lg sm:rounded-xl
                  ps-3 sm:ps-4
                  bg-gray-100
                  border border-gray-300
                  focus:border-sky-600
                  outline-none
                  text-sm sm:text-base
                  ${input.type === "file" && "hidden"}`}
                placeholder={input.placeholder}
                id={"input" + index}
                name={input.name}
                onChange={dataHandiling}
              />
            </div>
          ))}
        </div>

        <div className="mt-4 sm:mt-6">
          <input
            type="submit"
            value={btn}
            className="
              cursor-pointer
              w-full
              h-10 sm:h-12
              bg-sky-500 hover:bg-sky-600
              rounded-lg sm:rounded-xl
              text-white
              text-sm sm:text-base
              transition-colors
            "
          />
          <div className="flex gap-2 justify-center mt-4 text-sm sm:text-base">
            <p>{footer.description}</p>
            <Link
              to={footer.link.url}
              className="text-sky-500 hover:text-sky-600 underline transition-colors"
            >
              {footer.link.content}
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AuthForm;
