"use client";

import axios from "axios";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
type StringItem = { value: string };
type ProductFormValues = {
  title: string;

  description: string;
  text: StringItem[];
  img: string;
};

const BlogCreatePage = () => {
  const { register, handleSubmit, control, reset } = useForm<ProductFormValues>(
    {
      defaultValues: {
        title: "",
        text: [{ value: "" }],
        img: "",
        description: "",
      },
    }
  );
  const {
    fields: textFields,
    append: appendText,
    remove: removeText,
  } = useFieldArray<ProductFormValues, "text">({
    control,
    name: "text",
  });
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0]; // берём только первую картинку
    setImgFile(file);
    setImgPreview(URL.createObjectURL(file));
  };


const uploadImage = async (): Promise<string | null> => {
  if (!imgFile) return null;

  const formData = new FormData();
  formData.append("file", imgFile);
  formData.append("upload_preset", "ml_default"); // твой preset Cloudinary

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/ddfg2dvt3/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  console.log("Cloudinary response:", data);

  if (data.error) {
    console.error("Cloudinary upload error:", data.error.message);
    return null;
  }

  return data.secure_url || null;
};



  const onSubmit = async (data: ProductFormValues) => {
    const uploadedUrl = await uploadImage();
    const finalData = {
      ...data,
      text: data.text.map((t) => t.value),
      img: uploadedUrl || "",
    };

    try {
      await axios.post("/api/blog", finalData);
      alert("Товар создан!");
      reset()
    } catch (error) {
      console.error(error);
      alert("Ошибка при сохранении товара");
    }
  };
  return (
    <div className="p-4 mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-4 border-1 "
      >
        <div className="flex flex-col gap-2">
          <label>Название блога</label>
          <input
            {...register("title", { required: true })}
            className="border-1"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-gray-500">В карточке под блогом текст</label>
          <textarea
            {...register("description", { required: true })}
            className="border-1 h-8"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Виберіть картинку</label>
          <input type="file" accept="image/*" onChange={handleImgChange} className="cursor-pointer"/>
          {imgPreview && (
            <img
              src={imgPreview}
              alt="preview"
              className="w-32 h-32 object-cover"
            />
          )}
        </div>
        <div className="flex flex-col gap-2 border-1 p-2">
          <label className="text-sm">Текст</label>
          {textFields.map((field, index) => (
            <div key={field.id}>
              <textarea
                {...register(`text.${index}.value` as const, {
                  required: true,
                })}
                className="border-1 w-full"
              />
              <button type="button" onClick={() => removeText(index)} className="text-red-500">
                удалить
              </button>
            </div>
          ))}
          <button type="button" onClick={() => appendText({ value: "" })}>
            Додати текст
          </button>
        </div>
        <button type="submit">Create Blog Post</button>
      </form>
    </div>
  );
};

export default BlogCreatePage;
