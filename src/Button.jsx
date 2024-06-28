export const Button = ({children, className, ...restProps}) => {
  return (
    <button className={"px-2 py-1 bg-gray-900 dark:bg-gray-800 text-white rounded-md " + className} {...restProps}>
      {children}
    </button>
  );
};