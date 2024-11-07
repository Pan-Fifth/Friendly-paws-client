import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "react-toastify";
import axiosInstance from "@/src/utils/axiosInstance";

const ManageDonation = () => {
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [donationOptions, setDonationOptions] = useState([
    { amount: 0, benefit: "", icon: "" },
    { amount: 0, benefit: "", icon: "" },
    { amount: 0, benefit: "", icon: "" },
  ]);

  const fetchContent = async () => {
    try {
      const response = await axiosInstance.get("/admin/donation-content");
      setContent(response.data);
      setDonationOptions(JSON.parse(response.data.donation_options));
    } catch (error) {
      toast.error("Error fetching content");
      console.error("Error fetching content:", error);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleOptionChange = (index, field, value) => {
    const newOptions = [...donationOptions];
    newOptions[index][field] = field === "amount" ? Number(value) : value;
    setDonationOptions(newOptions);
  };

  const handleContentChange = (field, value) => {
    setContent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const updatedContent = {
        ...content,
        donation_options: JSON.stringify(donationOptions),
      };
      await axiosInstance.put(`/admin/donation-content/${content.id}`, updatedContent);
      toast.success("Content updated successfully");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error updating content",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!content) return null;

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Manage Donation Page Content</h1>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold mb-4">English Content</h2>
            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input
                  value={content.title_en}
                  onChange={(e) => handleContentChange("title_en", e.target.value)}
                />
              </div>
              <div>
                <Label>Description</Label>
                <Input
                  value={content.description_en}
                  onChange={(e) => handleContentChange("description_en", e.target.value)}
                />
              </div>
              <div className="space-y-4">
  <div>
    <Label>Typing Message 1</Label>
    <Input
      value={content.typing_en?.split('|')[0] || ''}
      onChange={(e) => {
        const messages = content.typing_en?.split('|') || ['', '', ''];
        messages[0] = e.target.value;
        handleContentChange("typing_en", messages.join('|'));
      }}
    />
  </div>
  <div>
    <Label>Typing Message 2</Label>
    <Input
      value={content.typing_en?.split('|')[1] || ''}
      onChange={(e) => {
        const messages = content.typing_en?.split('|') || ['', '', ''];
        messages[1] = e.target.value;
        handleContentChange("typing_en", messages.join('|'));
      }}
    />
  </div>
  <div>
    <Label>Typing Message 3</Label>
    <Input
      value={content.typing_en?.split('|')[2] || ''}
      onChange={(e) => {
        const messages = content.typing_en?.split('|') || ['', '', ''];
        messages[2] = e.target.value;
        handleContentChange("typing_en", messages.join('|'));
      }}
    />
  </div>
</div>
              <div>
                <Label>Form Title</Label>
                <Input
                  value={content.form_title_en}
                  onChange={(e) => handleContentChange("form_title_en", e.target.value)}
                />
              </div>
              <div>
                <Label>Form Description</Label>
                <Input
                  value={content.form_desc_en}
                  onChange={(e) => handleContentChange("form_desc_en", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Thai Content</h2>
            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input
                  value={content.title_th}
                  onChange={(e) => handleContentChange("title_th", e.target.value)}
                />
              </div>
              <div>
                <Label>Description</Label>
                <Input
                  value={content.description_th}
                  onChange={(e) => handleContentChange("description_th", e.target.value)}
                />
              </div>
              <div className="space-y-4">
  <div>
    <Label>Typing Message 1</Label>
    <Input
      value={content.typing_th?.split('|')[0] || ''}
      onChange={(e) => {
        const messages = content.typing_th?.split('|') || ['', '', ''];
        messages[0] = e.target.value;
        handleContentChange("typing_th", messages.join('|'));
      }}
    />
  </div>
  <div>
    <Label>Typing Message 2</Label>
    <Input
      value={content.typing_th?.split('|')[1] || ''}
      onChange={(e) => {
        const messages = content.typing_th?.split('|') || ['', '', ''];
        messages[1] = e.target.value;
        handleContentChange("typing_th", messages.join('|'));
      }}
    />
  </div>
  <div>
    <Label>Typing Message 3</Label>
    <Input
      value={content.typing_th?.split('|')[2] || ''}
      onChange={(e) => {
        const messages = content.typing_th?.split('|') || ['', '', ''];
        messages[2] = e.target.value;
        handleContentChange("typing_th", messages.join('|'));
      }}
    />
  </div>
</div>
              <div>
                <Label>Form Title</Label>
                <Input
                  value={content.form_title_th}
                  onChange={(e) => handleContentChange("form_title_th", e.target.value)}
                />
              </div>
              <div>
                <Label>Form Description</Label>
                <Input
                  value={content.form_desc_th}
                  onChange={(e) => handleContentChange("form_desc_th", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Donation Options</h2>
          <div className="space-y-6">
            {donationOptions.map((option, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 p-4 border rounded">
                <div>
                  <Label>Amount</Label>
                  <Input
                    type="number"
                    value={option.amount}
                    onChange={(e) => handleOptionChange(index, "amount", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Benefit Description</Label>
                  <Input
                    value={option.benefit}
                    onChange={(e) => handleOptionChange(index, "benefit", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Icon (emoji)</Label>
                  <Input
                    value={option.icon}
                    onChange={(e) => handleOptionChange(index, "icon", e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Button className="w-full mt-6" onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  );
};

export default ManageDonation;
