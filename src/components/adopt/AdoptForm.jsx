import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import useAuthStore from "@/src/stores/AuthStore"
import usePetStore from "@/src/stores/PetStore"
import { useNavigate } from "react-router-dom"
import { useState, useRef } from "react"
import { toast } from "react-toastify"
export function DialogAdopt({ petId }) {
  const token = useAuthStore(state => state.token)
  const fileInput = useRef(null)
  const [files, setFiles] = useState([]);
  const [houseCheck, setHouseCheck] = useState({
    hasGarden: false,
    hasFence: false,
    canWalkDog: false,
  });
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState({})
  const navigate = useNavigate()
  const user = useAuthStore(state => state.user.user)
  const actionCreateAdoptRequest = usePetStore(state => state.actionCreateAdoptRequest)
  const hdlChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  const hdlClick = (e) => {
    if (!user) {
      e.preventDefault()
      navigate("/login")
    }
  }
  const hdlAddClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (fileInput.current) {
      fileInput.current.click(); // Programmatically click the hidden input
    }
  }

  const hdlFileChange = (e) => {
    console.log("e files", e.target.files)
    const selectedFiles = Array.from(e.target.files)
    setFiles([...files, ...selectedFiles])

  }

  //Delete file
  const hdlDeleteFile = (indexToDelete, e) => {
    e.preventDefault()
    e.stopPropagation()
    const newFiles = files.filter((_, index) => index !== indexToDelete)
    setFiles(newFiles)
  }

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault()
      if (files.length > 5) {
        toast.error("You can only upload 5 files")
        return
      }
      if (files.length < 3) {
        toast.error("You must upload at least 3 files")
        return
      }
      const formData = new FormData()
      for (const key in input) {
        formData.append(key, input[key])
      }
      for (const key in houseCheck) {
        formData.append(key, houseCheck[key])
      }
      formData.append("userId", user.id)
      formData.append("petId", petId)
      formData.append("files", files)
      files.forEach((file) => {
        formData.append('files', file);
      });
      formData.forEach((value, key) => {
        console.log(key, value)
      })
      await actionCreateAdoptRequest(formData,token)
      toast.success("Adoption request submitted successfully")
      setOpen(false)

    } catch (err) {
      setOpen(true)
      console.log(err, "err here")
      // toast.error(err.response.data.message)
    }

  }
  console.log("user", user.id)
  console.log("token",token)
  console.log(input)
  console.log(houseCheck)
  console.log(files)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={hdlClick}>Adopt Me</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl text-orange-400">Adoption Form</DialogTitle>
          <DialogDescription>
            Fill out this form to begin your adoption journey
          </DialogDescription>
        </DialogHeader>

        <div className="bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Adoption Application</h2>
          <p className="text-gray-700 mb-4">
            Welcome, {user.firstname}. Thank you for considering adoption through Friendly Paws.
          </p>

          <form>
            {/* Personal Information Section */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Personal Information</h3>
              <div className="flex gap-4">
                <div>
                  <label className="mb-1 flex-1">First Name*</label>
                  <input type="text" placeholder={user.firstname || "First Name*"} className="border p-2 rounded w-full" name="firstname" onChange={hdlChange} />
                </div>
                <div>
                  <label className=" mb-1 flex-1">Last Name*</label>
                  <input type="text" placeholder={user.lastname || "Last Name*"} className="border p-2 rounded w-full" name="lastname" onChange={hdlChange} />
                </div>
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block mb-1">Date of Birth*</label>
                  <input type="date" className="border p-2 rounded w-full" name="dateOfBirth" onChange={hdlChange} />
                </div>
                <div>
                  <label className="block mb-1">Phone No.*</label>
                  <input type="tel" placeholder="Phone No.*" className="border p-2 rounded w-full" name="phone" onChange={hdlChange} />
                </div>
                <div>
                  <label className="block mb-1">Line*</label>
                  <input type="text" placeholder="Line*" className="border p-2 rounded w-full" name="socialContact" onChange={hdlChange} />
                </div>
                <div>
                  <label className="block mb-1">Email*</label>
                  <input type="email" placeholder="Email*" className="border p-2 rounded w-full" name="email" onChange={hdlChange} />
                </div>
              </div>
            </div>

            {/* Living Situation Section */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Living Situation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">Address*</label>
                  <input type="text" placeholder="Address*" className="border p-2 rounded w-full" name="address" onChange={hdlChange} />
                </div>
                <div>
                  <label className="block mb-1">Career*</label>
                  <input type="text" placeholder="Career*" className="border p-2 rounded w-full" name="career" onChange={hdlChange} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block mb-1">Work Place*</label>
                  <input type="text" placeholder="Work Place*" className="border p-2 rounded w-full" name="workPlace" onChange={hdlChange} />
                </div>
                <div>
                  <label className="block mb-1">Working Time*</label>
                  <input type="text" placeholder="Working Time*" className="border p-2 rounded w-full" name="workTime" onChange={hdlChange} />
                </div>
                <div>
                  <label className="block mb-1">Day off*</label>
                  <input type="text" placeholder="Day off*" className="border p-2 rounded w-full" name="dayOff" onChange={hdlChange} />
                </div>
                <div>
                  <label className="block mb-1">Salary (baht/month)*</label>
                  <input type="number" placeholder="Salary*" className="border p-2 rounded w-full" name="salary" onChange={hdlChange} />
                </div>
                <div>
                  <label className="block mb-1">Family member*</label>
                  <input type="number" placeholder="Family member*" className="border p-2 rounded w-full" name="familyMemberCount" onChange={hdlChange} />
                </div>

              </div>
            </div>

            {/* Home Environment Section */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Home Environment</h3>
              <label className="block mb-1">Is anyone home during the day?</label>
              <div className="flex gap-4 mb-2">
                <label className="flex items-center">
                  <input type="radio" className="mr-2" name="familyAlwaysHome" value={true} onChange={hdlChange} />
                  Yes
                </label>
                <label className="flex items-center">
                  <input type="radio" className="mr-2" name="familyAlwaysHome" value={false} onChange={hdlChange} />
                  No
                </label>
              </div>
              <input
                type="number"
                placeholder="If no one is home, how many hours will the dog be alone?"
                className="border p-2 rounded w-full"
                name="aloneHours"
                onChange={hdlChange}
              />
            </div>

            {/* Adoption Checklist Section */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Adoption Checklist</h3>
              <label className="block mb-1">House Holder*</label>
              <select className="border p-2 rounded w-full" onChange={hdlChange} name="housingType" required>
                <option disabled>Select</option>
                <option value={"OWN_HOUSE"}>I own a house</option>
                <option value={"RENTAL_HOUSE"}>I rent a house</option>
                <option value={"CONDO"}>I live in condo</option>
                <option value={"APARTMENT"}>I live in apartment</option>
              </select>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" name="hasGarden"
                    onChange={(e) => setHouseCheck({
                      ...houseCheck,
                      hasGarden: e.target.checked
                    })} />
                  I have a garden
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" name="hasFence"
                    onChange={(e) => setHouseCheck({
                      ...houseCheck,
                      hasFence: e.target.checked
                    })} />
                  I have a fence
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" name="canWalkDog"
                    onChange={(e) => setHouseCheck({
                      ...houseCheck,
                      canWalkDog: e.target.checked
                    })}
                  />
                  I can walk the dog on a leash
                </label>
              </div>
            </div>

            {/* Owner Pet Preference Section */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Pet Information</h3>
              <div className="flex gap-2">
                <div>
                  <label className="block mb-1">Current Pet Count*</label>
                  <input type="number" placeholder="Number of Pets*" className="border p-2 rounded w-full" name="currentPetCount" onChange={hdlChange} />
                </div>
                <div>
                  <label className="block mb-1">Current Pet Detail*</label>
                  <input type="text" placeholder="Pet Detail*" className="border p-2 rounded w-full" name="currentPetDetails" onChange={hdlChange} />
                </div>
              </div>
            </div>

            {/* Delivery Preference Section */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Delivery Checklist</h3>
              <label className="block mb-1">Is anyone home during the day?</label>
              <div className="flex gap-4 mb-2">
                <label className="flex items-center">
                  <input type="radio" className="mr-2" name="deliveryType" value={"PICK_UP"} onChange={hdlChange} />
                  Can Pickup
                </label>
                <label className="flex items-center">
                  <input type="radio" className="mr-2" name="deliveryType" value={"REQUIRE_DELIVERY"} onChange={hdlChange} />
                  Request for Delivery
                </label>
              </div>
            </div>


            {/* Upload Accommodation Images Section */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Upload Accommodation Images (3-5 Pictures)</h3>

              <Button onClick={hdlAddClick} >Add Picture</Button>
              {files.length > 0 ? <p>{files.length} selected files</p> : <p>no selected file</p>}
              <input
                type="file"
                accept="image/*"
                ref={fileInput}
                multiple
                className="border p-2 rounded w-full no "
                style={{ display: "none" }}
                onChange={hdlFileChange}
              />
            </div>

            {files.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {files.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Button
                      onMouseDown={(e) => hdlDeleteFile(index, e)}
                      onClick={(e) => e.preventDefault()}
                      type="button"
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full"
                      size="sm"
                    >
                      ✕
                    </Button>
                  </div>
                ))}
              </div>
            )}



            {/*Explain why want to adopt Section */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Tell us why you want to adopt this little guy?</h3>
              <div>
                <textarea type="text" className="border p-2 rounded w-full h-[300px]" name="notes" onChange={hdlChange} />
              </div>
            </div>


            {/* Submit Button */}
            <DialogFooter>
              <Button type="submit" className="bg-orange-400 hover:bg-orange-500 text-white py-2 px-4 rounded" onClick={hdlSubmit}>
                Submit Application
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>

  )
}



