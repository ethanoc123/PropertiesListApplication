"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { redirect, useRouter } from "next/navigation";

interface FormData {
  bedrooms: number;
  bathrooms: number;
  price: number;
  description: string;
  images: string[];
  property_type: string;
  house_type?: string;
}

export default function PropertyForm() {
  const [user, setUser] = useState<User | null>(null);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);

  const supabase = createClient();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  console.log(user);

  const property_type = watch("property_type");
  const [houseTypeOptions, setHouseTypeOptions] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUser(data.user);
      } else {
        redirect("/login");
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    if (property_type === "house") {
      setHouseTypeOptions([
        { value: "terraced", label: "Terraced" },
        { value: "semi-detatched", label: "Semi Detatched" },
        { value: "detatched", label: "Detatched" },
      ]);
      setValue("house_type", "terraced");
    } else {
      setHouseTypeOptions([]);
    }
  }, [property_type]);

  const uploadFiles = async () => {
    console.log(filesToUpload);
    const urls = await Promise.all(
      filesToUpload.map(async (file) => {
        console.log(file, "----");
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error } = await supabase.storage
          .from("images")
          .upload(`${fileName}`, file);

        if (error) throw new Error("Failed to upload image");

        const upload = supabase.storage.from("images").getPublicUrl(fileName);
        console.log(upload);
        return upload.data.publicUrl;
      })
    );
    return urls;
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setFilesToUpload((prevFiles) => [...prevFiles, ...files]);
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setFilePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
    }
  };

  const onSubmit = async (formData: FormData) => {
    if (!user) {
      redirect("/login");
    }
    try {
      const imageUrls = await uploadFiles();
      const fullData = {
        ...formData,
        images: imageUrls,
        listed_by: user?.id,
      };
      const { error } = await supabase.from("properties").insert(fullData);
      if (error) throw new Error("Failed to save property data");
      router.push("/my-listings");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-5">
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Property Type
          </label>
          <select
            {...register("property_type", { required: true })}
            className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          >
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
          </select>
          {errors.property_type && (
            <p className="mt-1 text-sm text-red-600">This field is required</p>
          )}
        </div>
        {property_type === "house" && (
          <div className="w-full sm:w-1/3">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              House Type
            </label>
            <select
              {...register("house_type", {
                required: property_type === "house",
              })}
              className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            >
              {houseTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.house_type && (
              <p className="mt-1 text-sm text-red-600">
                This field is required
              </p>
            )}
          </div>
        )}
      </div>

      <div className="flex space-x-4">
        <div className="flex-1">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Bedrooms
          </label>
          <select
            {...register("bedrooms", { required: true })}
            className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          >
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          {errors.bedrooms && (
            <p className="mt-1 text-sm text-red-600">This field is required</p>
          )}
        </div>
        <div className="flex-1">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Bathrooms
          </label>
          <select
            {...register("bathrooms", { required: true })}
            className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          >
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          {errors.bathrooms && (
            <p className="mt-1 text-sm text-red-600">This field is required</p>
          )}
        </div>
        <div className="flex-1">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Price
          </label>
          <input
            type="number"
            {...register("price", { required: true })}
            className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">This field is required</p>
          )}
        </div>
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Description
        </label>
        <textarea
          {...register("description", { required: true })}
          className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        ></textarea>
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">This field is required</p>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <label className="block text-sm font-medium text-gray-900">
          Images
        </label>
        <div>
          <div className="flex gap-2 max-w-32 md:max-w-64">
            {filePreviews.map((src, index) => (
              <img key={index} src={src} className="rounded-sm" />
            ))}
          </div>
        </div>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Submit
      </button>
    </form>
  );
}
