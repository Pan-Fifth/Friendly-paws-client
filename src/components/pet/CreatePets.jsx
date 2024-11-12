import { useState,useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import usePetStore from '@/src/stores/PetStore'
import useAuthStore from '@/src/stores/AuthStore'
import { toast } from "react-toastify";
import { ImagePlus } from 'lucide-react'


export default function PetForm({ setOpen }) {
  const [errors, setErrors] = useState({})
  const fileInput = useRef(null)
  const actionGetAllPets = usePetStore(state => state.actionGetAllPets);
  const actionCreatePet = usePetStore(state => state.actionCreatePet);
  const token = useAuthStore(state => state.token);
  const [file, setFile] = useState([])
  const [formData, setFormData] = useState({
    name_en: '',
    name_th: '',
    age: '',
    color: '',
    gender: '',
    type: '',
    breed_en: '',
    breed_th: '',
    description_en: '',
    description_th: '',
    is_vaccinated: false,
    is_neutered: false,
    weight: '',
    userId: '',
    image: ''
  })



  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckboxChange = (name) => (checked) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSelectChange = (name) => (value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectFile = Array.from(e.target.files)
  if (file.length + selectFile.length > 6) {
    toast.error('Maximum 6 images allowed')
    return
  }
  setFile([...file, ...selectFile])
};
  const handleAddClick = (e) => {
    e.preventDefault();
    e.stopPropagation()
    if(fileInput.current){
      fileInput.current.click()
    }
  }

  const handleDeleteFile = (index,e) => {
    e.preventDefault()
    e.stopPropagation()
   const newFile = file.filter((_, i) => i !== index)
   setFile(newFile)
  }

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};
  
    if (!formData.name_en.trim()) {
      newErrors.name_en = 'English name is required';
      isValid = false;
    }
  
    if (!formData.name_th.trim()) {
      newErrors.name_th = 'Thai name is required';
      isValid = false;
    }
  
    if (!formData.age || formData.age <= 0) {
      newErrors.age = 'Age must be greater than 0';
      isValid = false;
    }
  
    if (!formData.color.trim()) {
      newErrors.color = 'Color is required';
      isValid = false;
    }
  
    if (!formData.breed_en.trim()) {
      newErrors.breed_en = 'English breed is required';
      isValid = false;
    }
  
    if (!formData.breed_th.trim()) {
      newErrors.breed_th = 'Thai breed is required';
      isValid = false;
    }
  
    if (!formData.weight || formData.weight <= 0) {
      newErrors.weight = 'Weight must be greater than 0';
      isValid = false;
    }
  
    if (!formData.description_en.trim()) {
      newErrors.description_en = 'English description is required';
      isValid = false;
    }
  
    if (!formData.description_th.trim()) {
      newErrors.description_th = 'Thai description is required';
      isValid = false;
    }
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
      isValid = false;
    }
    if (!formData.type) {
      newErrors.type = 'Type is required';
      isValid = false;
    }
  
    setErrors(newErrors);
    return isValid;
  };
  

  
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {

      if(file.length < 1 || file.length > 6){ // Changed from 3 to 6
        toast.error('Please select between 1-6 images')
        return
      }
      if (!validateForm()) {
        return;
      }

      const body = new FormData()
      console.log(formData.is_vaccinated)
      console.log(typeof formData.is_vaccinated)
      body.append('name_th', formData.name_th)
      body.append('name_en', formData.name_en)
      body.append('age', formData.age)
      body.append('color', formData.color)
      body.append('gender', formData.gender)
      body.append('type', formData.type)
      body.append('breed_en', formData.breed_en)
      body.append('breed_th', formData.breed_th)
      body.append('description_en', formData.description_en)
      body.append('description_th', formData.description_th)
      body.append('is_vaccinated', formData.is_vaccinated);
      body.append('is_neutered', formData.is_neutered);
      body.append('weight', formData.weight)
      file.forEach(el => {
        body.append('image', el)
      })
      // body.forEach( (value,key) => {
      //   console.log(key , value)
      // });
      const result = await actionCreatePet(token,body)
      toast.success("Create Pet Successfully")
      setOpen(false)
      actionGetAllPets(token)
      
    } catch (err) {
      console.log(err);
    }

  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-2xl mx-auto p-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name_en">ชื่อภาษาอังกฤษ</Label>
          <Input 
          id="name_en" 
          name="name_en" 
          value={formData.name_en} 
          onChange={handleInputChange} 
          className={errors.name_en ? 'border-red-500' : ''} />
          {errors.name_en && <p className="text-red-500 text-sm">{errors.name_en}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="name_th">ชื่อภาษาไทย</Label>
          <Input id="name_th" name="name_th" value={formData.name_th} onChange={handleInputChange} 
          className={errors.name_en ? 'border-red-500' : ''} />
          {errors.name_th && <p className="text-red-500 text-sm">{errors.name_th}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="age">วันเกิด</Label>
          <Input id="age" name="age" type="date" 
          value={formData.age} 
          onChange={handleInputChange}
          className={errors.age ? 'border-red-500' : ''} />
          {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="color">สี</Label>
          <Input id="color" name="color" value={formData.color} onChange={handleInputChange} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="gender">เพศ</Label>
          <Select onValueChange={handleSelectChange('gender')}>
            <SelectTrigger className={errors.gender ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MALE">ชาย</SelectItem>
              <SelectItem value="FEMALE">หญิง</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="type">ประเภท</Label>
          <Select onValueChange={handleSelectChange('type')}>
            <SelectTrigger className={errors.type ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DOG">หมา</SelectItem>
              <SelectItem value="CAT">แมว</SelectItem>
            </SelectContent>
          </Select>
          {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="breed_en">สายพันธุ์ภาษาอังกฤษ</Label>
          <Input id="breed_en" name="breed_en" value={formData.breed_en} onChange={handleInputChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="breed_th">สายพันธุ์ภาษาไทย</Label>
          <Input id="breed_th" name="breed_th" value={formData.breed_th} onChange={handleInputChange} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description_en">คำอธิบายภาษาอังกฤษ</Label>
        <Textarea id="description_en" name="description_en" value={formData.description_en} onChange={handleInputChange} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description_th">คำอธิบายภาษาไทย</Label>
        <Textarea id="description_th" name="description_th" value={formData.description_th} onChange={handleInputChange} />
      </div>


      <div className="flex space-x-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="is_vaccinated"
            checked={formData.is_vaccinated}
            onCheckedChange={handleCheckboxChange('is_vaccinated')}
          />
          <Label htmlFor="is_vaccinated">วัคซีน</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="is_neutered"
            checked={formData.is_neutered}
            onCheckedChange={handleCheckboxChange('is_neutered')}
          />
          <Label htmlFor="is_neutered">ทำหมัน</Label>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="weight">น้ำหนัก</Label>
          <Input id="weight" name="weight" type="number" value={formData.weight} 
          onChange={handleInputChange}
          className={errors.weight ? 'border-red-500' : ''} />
           {errors.weight && <p className="text-red-500 text-sm">{errors.weight}</p>}

        </div>
      </div>

      <div className="space-y-2">
        <Button onClick={handleAddClick} className='text-white bg-[#db2778e3]'><ImagePlus /> +เพิ่มรูปภาพ</Button>
        {file.length > 0 ? <p>{file.length} จาก /6 รูป</p> :<p>ไม่ได้เลือกไฟล์</p> }
        <Input 
        id="image" 
        name="image" 
        type="file" 
        accept="image/*" 
        ref={fileInput}
        multiple={true}
        style={{ display: 'none' }}
        onChange={handleFileChange} />
      </div>
      {file.length > 0 && (
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {file.map((file, index) => (
              <div key={index} className="w-24 h-24 relative ">
                <img src={URL.createObjectURL(file)} alt=""/>
                <button onClick={(e) => handleDeleteFile(index,e)} className='bg-red-500 h-[20px] w-[20px] rounded-full absolute top-[-10px] right-[-4px] z-20 flex justify-center items-center'>x</button>
              </div>
            ))}
          </div>
        </div>
      )}

      <Button type="submit" className="w-full">ยืนยัน</Button>
    </form>
  )
}
