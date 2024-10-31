import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function DialogAdopt() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Adopt Now</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-orange-400">Adoption Form</DialogTitle>
          <DialogDescription>
            Fill out this form to begin your adoption journey
          </DialogDescription>
        </DialogHeader>

        <div className="mb-8">
          <h2 className="font-medium mb-2">Adoption</h2>
          <p className="text-sm text-gray-600 mb-4">
            The man That Rescues Dogs (TMTRD) is a Non-Profit Organization (NGO) in Sweden and Foundation in Thailand that rescues and cares for stray dogs. We vaccinate, stay, and neuter, provide medical treatment and find homes for these former street dogs.
          </p>
          <p className="text-sm text-gray-600 mb-4">
            Thai street dogs are a mix of many different breeds, therefore we cannot identify any dogs specific breed. They were either born in the streets or abandoned by their owners who no longer wanted to care for their dogs.
          </p>
          <p className="text-sm text-gray-600">
            Adopting a rescue dog is one of the most rewarding experiences for both the dog and you, the future doggy parent. We will work with you to make sure you find the best dog that suits your lifestyle and family needs. In order to be eligible to adopt you will need to check the TMTRD Adoption Criteria.
          </p>
        </div>

        <form>
          <div className="mb-8">
            <h3 className="font-medium mb-4">Please fill in your information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <input type="text" placeholder="Name*" className="border p-2 rounded" />
              <input type="text" placeholder="Last name*" className="border p-2 rounded" />
              <select className="border p-2 rounded">
                <option>Interested to adopt*</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <select className="border p-2 rounded">
                <option>Gender</option>
              </select>
              <input type="date" placeholder="Date of birth*" className="border p-2 rounded" />
              <input type="tel" placeholder="Phone No.*" className="border p-2 rounded" />
            </div>

            <div className="grid grid-cols-1 gap-4 mb-4">
              <input type="text" placeholder="Address*" className="border p-2 rounded" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <input type="email" placeholder="Email*" className="border p-2 rounded" />
              <input type="text" placeholder="FB / IG" className="border p-2 rounded" />
              <input type="text" placeholder="Line ID / Skype / Other" className="border p-2 rounded" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input type="text" placeholder="Career*" className="border p-2 rounded" />
              <input type="text" placeholder="Work place*" className="border p-2 rounded" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <input type="text" placeholder="Work time*" className="border p-2 rounded" />
              <input type="text" placeholder="Day off*" className="border p-2 rounded" />
              <input type="text" placeholder="Salary* (baht/month)" className="border p-2 rounded" />
              <input type="text" placeholder="Family member" className="border p-2 rounded" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input type="text" placeholder="How many pet do you have? *" className="border p-2 rounded" />
              <input type="text" placeholder="describe your pet*" className="border p-2 rounded" />
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-medium mb-4">Your family are always home</h3>
            <div className="flex gap-4 mb-2">
              <label className="flex items-center">
                <input type="radio" name="family-home" className="mr-2" />
                Yes
              </label>
              <label className="flex items-center">
                <input type="radio" name="family-home" className="mr-2" />
                No
              </label>
            </div>
            <input 
              type="text" 
              placeholder="If no one home, dog will stay alone (hours) :" 
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="mb-8">
            <h3 className="font-medium mb-4">Adoption checklist</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Own house
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Rental house
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Single house
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Condo/Apartment
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Rental Room
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Fence
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Garden/Yard
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Can you take dog for walk on a leash?
              </label>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-medium mb-4">Type of delivery</h3>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input type="radio" name="delivery" className="mr-2" />
                TMTRD deliver
              </label>
              <label className="flex items-center">
                <input type="radio" name="delivery" className="mr-2" />
                Pick up
              </label>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-medium mb-4">Attach your accommodation. (Max 3 Pictures)</h3>
            <input 
              type="file" 
              accept="image/*" 
              multiple 
              className="border p-2 rounded w-full"
            />
          </div>

          <DialogFooter>
            <Button type="submit" className="bg-orange-400 hover:bg-orange-500 text-white">
              Submit Application
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}



