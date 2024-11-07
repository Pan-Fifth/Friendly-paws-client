import { useState, useEffect } from 'react'
import usePetStore from '@/src/stores/PetStore'
import useAuthStore from '@/src/stores/AuthStore'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "react-toastify";

const EditPetsForm = ({ petId, setOpen }) => {

  const allPets = usePetStore(state => state.allPets);
  const actionGetAllPets = usePetStore(state => state.actionGetAllPets);
  const actionEditPet = usePetStore(state => state.actionEditPet);
  const token = useAuthStore(state => state.token);
  const [file, setFile] = useState(null)
  const [formData, setFormData] = useState({
    name_en: '',
    name_th: '',
    age: '',
    color: '',
    gender: '',
    type: '',
    breed_en: '',
    breed_th: '',
    status: 'AVAILABLE',
    description_en: '',
    description_th: '',
    is_vaccinated: false,
    is_neutered: false,
    weight: '',
    userId: '',
    image: ''
  })

  useEffect(() => {
    if (petId) {
      // Fetch the current pet's data and populate the form
      const currentPet = allPets.find(pet => pet.id === petId);
      if (currentPet) {
        setFormData({
          name_en: currentPet.name_en,
          name_th: currentPet.name_th,
          age: currentPet.age,
          color: currentPet.color,
          gender: currentPet.gender,
          type: currentPet.type,
          breed_en: currentPet.breed_en,
          breed_th: currentPet.breed_th,
          status: currentPet.status,
          description_en: currentPet.description_en,
          description_th: currentPet.description_th,
          is_vaccinated: currentPet.is_vaccinated,
          is_neutered: currentPet.is_neutered,
          weight: currentPet.weight,
        });
      }
    }
  }, [petId]);

  const hdlChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const hdlCheckboxChange = (name) => (checked) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };
  const hdlSelectChange = (name) => (value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const hdlSubmit = async (e) => {
    e.preventDefault();
    if (!petId) {
      console.error("Pet ID is not defined");
      return;
    }
    try {
      const body = new FormData();
      body.append('name_en', formData.name_en);
      body.append('name_th', formData.name_th);
      body.append('age', formData.age);
      body.append('color', formData.color);
      body.append('gender', formData.gender);
      body.append('type', formData.type);
      body.append('breed_en', formData.breed_en);
      body.append('breed_th', formData.breed_th);
      body.append('status', formData.status);
      body.append('description_en', formData.description_en);
      body.append('description_th', formData.description_th);
      body.append('is_vaccinated', formData.is_vaccinated);
      body.append('is_neutered', formData.is_neutered);
      body.append('weight', formData.weight);
      if (file) {
        body.append('image', file)
      }
      const result = await actionEditPet(token, petId, body)
      toast.success("แก้ไขสัตว์เลี้ยงเรียบร้อย")
      actionGetAllPets(token)
      setOpen(false)
      // console.log(result)

      setFormData({
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
        status: '',
        is_vaccinated: false,
        is_neutered: false,
        weight: '',
        userId: '',
        image: ''
      });
      setFile(null);

    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div>
      <form onSubmit={hdlSubmit} className="space-y-4 w-full max-w-2xl mx-auto p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name_en">ชื่อภาษาอังกฤษ</Label>
            <Input id="name_en" name="name_en" value={formData.name_en} onChange={hdlChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name_th">ชื่อภาษาไทย</Label>
            <Input id="name_th" name="name_th" value={formData.name_th} onChange={hdlChange} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="age">วันเกิด</Label>
            <Input id="age" name="age" type="date" value={formData.age} onChange={hdlChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="color">สี</Label>
            <Input id="color" name="color" value={formData.color} onChange={hdlChange} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="gender">เพศ</Label>
            <Select onValueChange={hdlSelectChange('gender')}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MALE">ชาย</SelectItem>
                <SelectItem value="FEMALE">หญิง</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">ประเภท</Label>
            <Select onValueChange={hdlSelectChange('type')}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DOG">หมา</SelectItem>
                <SelectItem value="CAT">แมว</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="breed_en">สายพันธุ์ภาษาอังกฤษ</Label>
            <Input id="breed_en" name="breed_en" value={formData.breed_en} onChange={hdlChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="breed_th">สายพันธุ์ภาษาไทย</Label>
            <Input id="breed_th" name="breed_th" value={formData.breed_th} onChange={hdlChange} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description_en">คำอธิบายภาษาอังกฤษ</Label>
          <Textarea id="description_en" name="description_en" value={formData.description_en} onChange={hdlChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description_th">คำอธิบายภาษาไทย</Label>
          <Textarea id="description_th" name="description_th" value={formData.description_th} onChange={hdlChange} />
        </div>


        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="is_vaccinated"
              checked={formData.is_vaccinated}
              onCheckedChange={hdlCheckboxChange('is_vaccinated')}
            />
            <Label htmlFor="is_vaccinated">วัคซีน</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="is_neutered"
              checked={formData.is_neutered}
              onCheckedChange={hdlCheckboxChange('is_neutered')}
            />
            <Label htmlFor="is_neutered">ทำหมัน</Label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="weight">น้ำหนัก</Label>
            <Input id="weight" name="weight" type="number" value={formData.weight} onChange={hdlChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">สาถานะ</Label>
            <Select onValueChange={hdlSelectChange('status')}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AVAILABLE">AVAILABLE</SelectItem>
                <SelectItem value="PENDING">PENDING</SelectItem>
                <SelectItem value="ADOPTED">ADOPTED</SelectItem>
                <SelectItem value="FOSTERED">FOSTERED</SelectItem>
                <SelectItem value="UNAVAILABLE">UNAVAILABLE</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">รูปภาพ</Label>
          <Input id="image" name="image" type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>

        <Button type="submit" className="w-full">ยืนยัน</Button>
      </form>


    </div>



  )
}

export default EditPetsForm