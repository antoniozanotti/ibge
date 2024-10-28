export default defineAppConfig({
  ui: {
    select: { placeholder: "text-gray-900" },
    formGroup: {
      label: {
        base: "text-gray-100",
      },
      description: "text-gray-100",
      hint: "text-gray-100",
      help: "text-gray-100",
      error: "text-red-100",
    },
    radio: {
      label: 'text-gray-100',
    }
  },
});
