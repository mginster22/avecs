"use client";

import { cn } from "@/lib/utils";
import { Product } from "@/types/product";
import axios from "axios";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

type StringItem = { value: string };
type Size = { size: string; stock: number };
type ProductFormValues = {
  category: string;
  categorySlug: string;
  title: string;
  gender: string;
  model: string;
  discount: number;
  slug: string;
  description: string;
  composition: StringItem[];
  peculiarities: StringItem[];
  price: number;
  season: string;
  sizes: Size[];
  color: string;
  colorLabel: string;
  img: string[];
};

interface ProductFormProps {
  initialData?: Product;
  onSuccess?: () => void;
}
export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, control } = useForm<ProductFormValues>(
    {
      defaultValues: initialData
        ? {
            ...initialData,
            composition: initialData.composition?.map((c) => ({
              value: c,
            })) || [{ value: "" }],
            peculiarities: initialData.peculiarities?.map((p) => ({
              value: p,
            })) || [{ value: "" }],
            sizes: initialData.sizes || [{ size: "", stock: 0 }],
          }
        : {
            category: "",
            categorySlug: "",
            title: "",
            gender: "",
            model: "",
            discount: 0,
            slug: "",
            description: "",
            composition: [{ value: "" }],
            peculiarities: [{ value: "" }],
            price: 0,
            season: "",
            sizes: [{ size: "", stock: 0 }],
            color: "",
            colorLabel: "",
            img: [],
          },
    }
  );

  // Состав (string[])
  const {
    fields: compFields,
    append: appendComp,
    remove: removeComp,
  } = useFieldArray<ProductFormValues, "composition">({
    control,
    name: "composition",
  });

  // Особенности (string[])
  const {
    fields: pecFields,
    append: appendPec,
    remove: removePec,
  } = useFieldArray<ProductFormValues, "peculiarities">({
    control,
    name: "peculiarities",
  });

  // Размеры (Size[])
  const {
    fields: sizeFields,
    append: appendSize,
    remove: removeSize,
  } = useFieldArray<ProductFormValues, "sizes">({
    control,
    name: "sizes",
  });

  const [imgFiles, setImgFiles] = useState<File[]>([]);
  const [imgPreviews, setImgPreviews] = useState<string[]>(
    initialData?.img || []
  );
  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setImgFiles(files);

    const urls = files.map((file) => URL.createObjectURL(file));
    setImgPreviews(urls);
  };
  const uploadImages = async (): Promise<string[]> => {
    const uploadedUrls: string[] = [];

    for (const file of imgFiles) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default"); // замените на свой preset Cloudinary

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/ddfg2dvt3/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      uploadedUrls.push(data.secure_url);
    }

    return uploadedUrls.length > 0 ? uploadedUrls : imgPreviews;
  };

  const onSubmit = async (data: ProductFormValues) => {
    const uploadedUrls = await uploadImages();
    const finalData = {
      ...data,
      composition: data.composition.map((c) => c.value),
      peculiarities: data.peculiarities.map((p) => p.value),
      img: uploadedUrls,
    };

    try {
      setLoading(true);
      if (initialData) {
        // обновление
        await axios.patch(`/api/products/${initialData.id}`, finalData);
        alert("Товар обновлён!");
      } else {
        // создание
        await axios.post("/api/products", finalData);
        alert("Товар создан!");
      }

      reset();
      setImgFiles([]);
      setImgPreviews([]);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
      alert("Ошибка при сохранении товара");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        "space-y-6 max-w-3xl p-4 border rounded",
        initialData && "overflow-y-scroll"
      )}
    >
      <label>
        <input
          {...register("category")}
          placeholder="Категория"
          className="border p-2 w-full"
        />
        <p className="text-sm text-gray-500 mt-2 break-words">
          {" "}
          Футболки,Шорти,Спортивні
          костюми,Кофти/Худі,Штани,Вітровки,Жилети,Термобілизна,Куртки,Лижні
          куртки,Легінси,Топи,Фітнес одяг,Лижні штани,Кепки{" "}
        </p>
      </label>
      <label>
        <input
          {...register("categorySlug")}
          placeholder="Slug категории"
          className="border p-2 w-full"
        />
        <p className="text-sm text-gray-500 mt-2">
          {" "}
          futbolki,shortu,tracksuit,hudi-sweter,shtanu,vitrovki,zhilety,termobilizna,kurtky,lizhnye-kurtki,legincu,topu,fitnec-odiag,lizhnye-wtanu,kepki{" "}
        </p>
      </label>
      <input
        {...register("title")}
        placeholder="Название"
        className="border p-2 w-full"
      />

      <label>
        <input
          {...register("gender")}
          placeholder="Пол"
          className="border p-2 w-full"
        />
        <p className="text-sm text-gray-500 mt-2">men,women</p>
      </label>
      <input
        {...register("model")}
        placeholder="Модель"
        className="border p-2 w-full"
      />
      <label>
        <input
          {...register("slug")}
          placeholder="Slug товара"
          className="border p-2 w-full"
        />
        <p>men-vitrovka-50413 women-vitrovka-50413</p>
      </label>
      <textarea
        {...register("description")}
        placeholder="Описание"
        className="border p-2 w-full"
      />

      {/* Состав */}
      <div>
        <h3 className="font-semibold">Состав</h3>
        {compFields.map((field, i) => (
          <div key={field.id} className="flex gap-2 my-1">
            <input
              {...register(`composition.${i}.value`)}
              className="border p-2 w-full"
            />
            <button type="button" onClick={() => removeComp(i)}>
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendComp({ value: "" })}
          className="text-blue-500"
        >
          + Добавить
        </button>
      </div>

      <div>
        <h3 className="font-semibold">Картинки</h3>
        <input type="file" multiple onChange={handleImgChange} />
        <div className="flex gap-2 mt-2">
          {imgPreviews.map((url, i) => (
            <img
              key={i}
              src={url}
              alt={`preview ${i}`}
              className="w-20 h-20 object-cover"
            />
          ))}
        </div>
      </div>

      {/* Особенности */}
      <div>
        <h3 className="font-semibold">Особенности</h3>
        {pecFields.map((field, i) => (
          <div key={field.id} className="flex gap-2 my-1">
            <input
              {...register(`peculiarities.${i}.value`)}
              className="border p-2 w-full"
            />
            <button type="button" onClick={() => removePec(i)}>
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendPec({ value: "" })}
          className="text-blue-500"
        >
          + Добавить
        </button>
      </div>

      {/* Размеры */}
      <div>
        <h3 className="font-semibold">Размеры</h3>
        {sizeFields.map((field, i) => (
          <div key={field.id} className="flex gap-2 my-1">
            <input
              {...register(`sizes.${i}.size`)}
              placeholder="Размер"
              className="border p-2"
            />
            <input
              {...register(`sizes.${i}.stock`, { valueAsNumber: true })}
              type="number"
              placeholder="Кол-во"
              className="border p-2 w-24"
            />
            <button type="button" onClick={() => removeSize(i)}>
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendSize({ size: "", stock: 0 })}
          className="text-blue-500"
        >
          + Добавить размер
        </button>
        <p>S,M,L,XL,XXL</p>
      </div>
      <label>
        <input
          type="number"
          {...register("price", { valueAsNumber: true })}
          placeholder="Цена"
          className="border p-2 w-full"
        />
        <p>Цена</p>
      </label>
      <label>
        <input
          type="number"
          {...register("discount", { valueAsNumber: true })}
          placeholder="Знижка"
          className="border p-2 w-full"
        />
        <p>Знижка</p>
      </label>
      <label>
        <input
          {...register("season")}
          placeholder="Сезон"
          className="border p-2 w-full"
        />
        <p>Зима,Літо,Демисезон</p>
      </label>
      <label>
        <input
          {...register("color")}
          placeholder="Цвет"
          className="border p-2 w-full"
        />
        <p>black,gray,graphite,blue,dark blue,bewevuy,brown</p>
      </label>
      <input
        {...register("colorLabel")}
        placeholder="Label цвета"
        className="border p-2 w-full"
      />

      <button
        type="submit"
        className={cn("bg-blue-600 text-white px-4 py-2 rounded", loading && "opacity-50")}
        disabled={loading}
      >
        {initialData ? "Изменить" : "Создать"}
      </button>
    </form>
  );
};
