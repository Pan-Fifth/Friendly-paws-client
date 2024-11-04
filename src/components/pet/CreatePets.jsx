import { useState,useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import usePetStore from '@/src/stores/PetStore'
import useAuthStore from '@/src/stores/AuthStore'
import { toast } from "react-toastify";


export default function PetForm({ setOpen }) {
  const actionGetAllPets = usePetStore(state => state.actionGetAllPets);
  const actionCreatePet = usePetStore(state => state.actionCreatePet);
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

  
  const handleSubmit = async(e) => {
    try {
      e.preventDefault();
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
      if(file){
        body.append('image', file)
      }

      const result = await actionCreatePet(token,body)
      toast.success("Create Pet Successfully")
      setOpen(false)
      actionGetAllPets(token)
      console.log(result)
    } catch (err) {
      console.log(err);
    }
   
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-2xl mx-auto p-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name_en">Name (English)</Label>
          <Input id="name_en" name="name_en" value={formData.name_en} onChange={handleInputChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name_th">Name (Thai)</Label>
          <Input id="name_th" name="name_th" value={formData.name_th} onChange={handleInputChange} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input id="age" name="age" type="number" value={formData.age} onChange={handleInputChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="color">Color</Label>
          <Input id="color" name="color" value={formData.color} onChange={handleInputChange} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select onValueChange={handleSelectChange('gender')}>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MALE">Male</SelectItem>
              <SelectItem value="FEMALE">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Select onValueChange={handleSelectChange('type')}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DOG">Dog</SelectItem>
              <SelectItem value="CAT">Cat</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="breed_en">Breed (English)</Label>
          <Input id="breed_en" name="breed_en" value={formData.breed_en} onChange={handleInputChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="breed_th">Breed (Thai)</Label>
          <Input id="breed_th" name="breed_th" value={formData.breed_th} onChange={handleInputChange} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description_en">Description (English)</Label>
        <Textarea id="description_en" name="description_en" value={formData.description_en} onChange={handleInputChange} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description_th">Description (Thai)</Label>
        <Textarea id="description_th" name="description_th" value={formData.description_th} onChange={handleInputChange} />
      </div>


      <div className="flex space-x-4">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="is_vaccinated" 
            checked={formData.is_vaccinated} 
            onCheckedChange={handleCheckboxChange('is_vaccinated')} 
          />
          <Label htmlFor="is_vaccinated">Vaccinated</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="is_neutered" 
            checked={formData.is_neutered} 
            onCheckedChange={handleCheckboxChange('is_neutered')} 
          />
          <Label htmlFor="is_neutered">Neutered</Label>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="weight">Weight</Label>
          <Input id="weight" name="weight" type="number" value={formData.weight} onChange={handleInputChange} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input id="image" name="image" type="file" onChange={(e) => setFile(e.target.files[0])} />
      </div>

      <Button type="submit" className="w-full">Submit</Button>
    </form>
  )
}
