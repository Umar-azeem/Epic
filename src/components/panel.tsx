"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus, Upload, X, Trash2, Eye } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { dealOfTheWeek } from "./ui/dealOfTheWeek";
import { Switch } from "./ui/switch";

import { stringify } from "querystring";

import axios from "axios";
import ManagesGames from "./managesGames";
import { useGameStore } from "../json/apiStore";
interface GameItem {
  _id?: string;
  mainImage?: string;
  coverImage?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
  title: string;
  description: string;
  label: string;
  category: string;
  dealOfTheWeek: string;
  tag: string;
  priceText: string;
  slug: string;
  screenshots: string[];
  price: number;
  originalPrice: number;
  currentPrice: number;
  discount: number;
  rating: number;
  availableDate: string;
  releaseDate: string;
  sectionType: string;
  gameType: string;
  priceType: string;
  status: string;
  platforms: string[];
  genres: string[];
  viewMore: boolean;
  viewAll: boolean;
  featured: boolean;
  isFree: boolean;
  trialAvailable: boolean;
  button: {
    enabled: boolean;
    text: string;
    type: string;
    style: string;
    link: string;
  };
}
const PLATFORMS = ["PC", "PS", "Xbox", "Mobile", "Switch"];
const GENRES = [
  "Action",
  "RPG",
  "Shooter",
  "Strategy",
  "Puzzle",
  "Adventure",
  "Sports",
  "Racing",
];
const SECTION_KEYS = [
  "Top Sellers",
  "Top Free to Play",
  "Top Upcoming Wishlisted",
  "New Releases",
  "Top Player Rated",
  "Coming Soon",
];
const PRICE_TYPES = ["free", "paid"]; 
const TITLE_SECTION = [
  "Discover Something New",
  "Fortnite",
  "Winter Sale Spotlight",
  "Game list Edition 1st",
  "Game list Edition 2nd",
  "Deals of the Week",
  "Top New Releases",
  "Featured Stories",
  "Featured from Epic First Run",
  "Most Popular",
  "FreeGames",
  "Edition",
];
const BUTTON_STYLES = ["primary", "secondary"];
const STATUS_OPTIONS = [
  "FREE NOW",
  "COMING SOON",
  "LIMITED OFFER",
  "DEAL OF THE WEEK",
  "GAME LIST",
];
export default function GameAdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [games, setGames] = useState<GameItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [screenshots, setScreenshots] = useState<File[]>([]);
  const fetchGames = useGameStore((s) => s.fetchGames);
  const [formData, setFormData] = useState<GameItem>({
    _id: "",
    title: "",
    description: "",
    label: "",
    category: "",
    dealOfTheWeek: "",
    tag: "",
    priceText: "",
    slug: "",
    mainImage: "", // changed from `image`
    coverImage: "",
    screenshots: [],
    price: 0,
    originalPrice: 0,
    currentPrice: 0,
    discount: 0,
    rating: 0,
    availableDate: "",
    releaseDate: "",
    sectionType: "grid",
    gameType: "game",
    priceType: "paid",
    status: "",
    platforms: [],
    genres: [],
    viewMore: false,
    viewAll: false,
    featured: false,
    isFree: false,
    trialAvailable: false,
    button: {
      enabled: false,
      text: "Buy Now",
      type: "paid",
      style: "primary",
      link: "",
    },
    createdAt: "", // added
    updatedAt: "", // added
  });
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "image" | "coverImage" | "screenshots",
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (field === "image") {
      const file = files[0];
      setMainImage(file);
      setFormData((prev) => ({
        ...prev,
        mainImage: URL.createObjectURL(file),
      }));
    } else if (field === "coverImage") {
      const file = files[0];
      setCoverImage(file);
      setFormData((prev) => ({
        ...prev,
        coverImage: URL.createObjectURL(file),
      }));
    } else if (field === "screenshots") {
      const newFiles = Array.from(files); //  handle multiple files
      const newUrls = newFiles.map((file) => URL.createObjectURL(file));

      // Add to real File state
      setScreenshots((prev) => [...prev, ...newFiles]);

      // Add to formData for preview
      setFormData((prev) => ({
        ...prev,
        screenshots: [...(prev.screenshots || []), ...newUrls], //  append instead of overwrite
      }));
    }
  };
  const handleSubmitData = async () => {
    console.log("Submitting...");
    console.log("Editing ID:", editingId);
    try {
      const formData2 = new FormData();
      // IMPORTANT: include _id when editing
      formData2.append(
        "json",
        JSON.stringify({
          ...formData,
          _id: editingId || undefined,
        }),
      );
      if (mainImage) formData2.append("mainImage", mainImage);
      if (coverImage) formData2.append("coverImage", coverImage);
      screenshots.forEach((file) => formData2.append("screenshots", file));
      const url = editingId
        ? `https://epic-backend-fslq.vercel.app/api/games/${editingId}`
        : "https://epic-backend-fslq.vercel.app/api/games";
      console.log("URL:", url);
      console.log("Method:", editingId ? "PUT" : "POST");
      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        body: formData2,
      });
      if (!res.ok) {
        const err = await res.text();
        throw new Error(err);
      }
      await fetchGames(); 
      resetForm();
      setEditingId(null);
      alert(editingId ? "Game updated!" : "Game added!");
    } catch (error) {
      console.error("Save error:", error);
    }
  }; 
  const handleEdit = (game: GameItem) => {
    console.log("Editing game:", game);
    setFormData({
      ...game,
      mainImage: game.mainImage || "",
      coverImage: game.coverImage || "",
    });
    setEditingId(game._id ?? null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const generateId = () => {
    return `game_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };
  const resetForm = () => {
    setFormData({
      _id: "",
      title: "",
      description: "",
      label: "",
      category: "",
      dealOfTheWeek: "",
      tag: "",
      priceText: "",
      slug: "",
      mainImage: "",
      coverImage: "",
      screenshots: [],
      price: 0,
      originalPrice: 0,
      currentPrice: 0,
      discount: 0,
      rating: 0,
      availableDate: "",
      releaseDate: "",
      sectionType: "grid",
      gameType: "game",
      priceType: "paid",
      status: "",
      platforms: [],
      genres: [],
      viewMore: false,
      viewAll: false,
      featured: false,
      isFree: false,
      trialAvailable: false,
      button: {
        enabled: false,
        text: "Buy Now",
        type: "paid",
        style: "primary",
        link: "",
      },
      createdAt: "",
      updatedAt: "",
    });
  };
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this game?")) return;

    try {
      const res = await fetch(
        `https://epic-backend-fslq.vercel.app/api/games/${id}`,
        { method: "DELETE" },
      );

      if (!res.ok) throw new Error("Delete failed");

      // refresh list
      fetchGames();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };
  const handleSubmit = () => {
    if (!formData.title || !formData.mainImage) {
      alert("Title and Image are required!");
      return;
    }
    const gameData = {
      ...formData,
      id: editingId || generateId(),
      slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, "-"),
    };
    if (editingId) {
      setGames((prev) => prev.map((g) => (g.id === editingId ? gameData : g)));
      setEditingId(null);
    } else {
      setGames((prev) => [...prev, gameData]);
    }
    resetForm();
    alert(editingId ? "Game updated!" : "Game added!");
  };
  const removeScreenshot = (index: number) => {
    // Remove preview
    setFormData((prev) => ({
      ...prev,
      screenshots: prev.screenshots?.filter((_, i) => i !== index) || [],
    }));
    // Remove real file
    setScreenshots((prev) => prev.filter((_, i) => i !== index));
  };
  const togglePlatform = (platform: string) => {
    setFormData((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }));
  };
  const toggleGenre = (genre: string) => {
    setFormData((prev) => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter((g) => g !== genre)
        : [...prev.genres, genre],
    }));
  };
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsAuthenticated(true);
    } else {
      alert("Invalid password");
    }
  };
  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
  };
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-app flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-app-secondary border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Game Store Admin</CardTitle>
            <CardDescription className="text-text-clr-light">
              Enter password to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-text-clr-light">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="bg-app border-gray-700 text-white"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Login
              </Button>
            </form>
            <div className="mt-4 text-sm text-text-clr-light text-center">
              Demo: admin123
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-app">
      <div className="border-b border-gray-700 bg-app-secondary">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Game Store Admin</h1>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-gray-700 text-text-clr-light hover:bg-app"
          >
            Logout
          </Button>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="add" className="space-y-6">
          <TabsList className="bg-app-secondary border-gray-700">
            <TabsTrigger
              value="add"
              className="text-text-clr-light data-[state=active]:bg-app data-[state=active]:text-white"
            >
              {editingId ? "Edit Game" : "Add Game"}
            </TabsTrigger>
            <TabsTrigger
              value="manage"
              className="text-text-clr-light data-[state=active]:bg-app data-[state=active]:text-white"
            >
              Manage Games ({games.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="add">
            <Card className="bg-app-secondary border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">
                  {editingId ? "Edit Game" : "Add New Game"}
                </CardTitle>
                <CardDescription className="text-text-clr-light">
                  Fill in the game details
                </CardDescription> 
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-text-clr-light">Title *</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      placeholder="Game title"
                      className="bg-app border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-text-clr-light">Slug</Label>
                    <Input
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData({ ...formData, slug: e.target.value })
                      }
                      placeholder="game-slug (auto-generated)"
                      className="bg-app border-gray-700 text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-text-clr-light">Description</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Game description"
                    rows={3}
                    className="bg-app border-gray-700 text-white"
                  />
                </div>
                {/* Text Fields */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-text-clr-light">Label</Label>
                    <Input
                      value={formData.label || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, label: e.target.value })
                      }
                      placeholder="e.g., New Release"
                      className="bg-app border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-text-clr-light">Category</Label>
                    <Input
                      value={formData.category || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      placeholder="e.g., Action"
                      className="bg-app border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-text-clr-light">dealOfTheWeek</Label>
                    <Input
                      value={formData.dealOfTheWeek || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          dealOfTheWeek: e.target.value,
                        })
                      }
                      placeholder="e.g., -50%"
                      className="bg-app border-gray-700 text-white"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-text-clr-light">Tag</Label>
                    <Input
                      value={formData.tag || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, tag: e.target.value })
                      }
                      placeholder="e.g., Bestseller"
                      className="bg-app border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-text-clr-light">Price Text</Label>
                    <Input
                      value={formData.priceText || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, priceText: e.target.value })
                      }
                      placeholder="e.g., $19.99"
                      className="bg-app border-gray-700 text-white"
                    />
                  </div>
                </div>
                {/* Main Image */}
                <div className="space-y-2">
                  <Label className="text-text-clr-light">Main Image *</Label>
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-4 bg-app">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "image")}
                      className="hidden"
                      id="main-image"
                    />
                    <label
                      htmlFor="main-image"
                      className="cursor-pointer block text-center"
                    >
                      {formData.mainImage ? (
                        <img
                          src={formData.mainImage}
                          alt="Preview"
                          className="max-h-40 mx-auto rounded"
                        />
                      ) : (
                        <div>
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <span className="block mt-2 text-sm text-text-clr-light">
                            Click to upload
                          </span>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
                {/* Cover Image & Screenshots */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-text-clr-light">Cover Image</Label>
                    <div className="border-2 border-dashed border-gray-700 rounded-lg p-4 bg-app">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, "coverImage")}
                        className="hidden"
                        id="cover-image"
                      />
                      <label
                        htmlFor="cover-image"
                        className="cursor-pointer block text-center"
                      >
                        {formData.coverImage ? (
                          <img
                            src={formData.coverImage}
                            alt="Cover"
                            className="max-h-32 mx-auto rounded"
                          />
                        ) : (
                          <div>
                            <Upload className="mx-auto h-8 w-8 text-gray-400" />
                            <span className="block mt-2 text-xs text-text-clr-light">
                              Upload cover
                            </span>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-text-clr-light">Screenshots</Label>

                    <div className="border-2 border-dashed border-gray-700 rounded-lg p-4 bg-app">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => handleImageUpload(e, "screenshots")}
                        className="hidden"
                        id="screenshots"
                      />

                      <label
                        htmlFor="screenshots"
                        className="cursor-pointer block text-center"
                      >
                        <Upload className="mx-auto h-8 w-8 text-gray-400" />
                        <span className="block mt-2 text-xs text-text-clr-light">
                          {Array.isArray(formData.screenshots)
                            ? formData.screenshots.length
                            : 0}{" "}
                          uploaded
                        </span>
                      </label>
                    </div>

                    {/* ✅ Show previews */}
                                                        
                    {Array.isArray(formData.screenshots) &&
                      formData.screenshots.length > 0 && (
                        <div className="flex gap-2 flex-wrap">
                          {formData.screenshots.map((img, i) => (
                            <div key={i} className="relative w-16 h-16">
                              <img
                                src={img}
                                alt={`Screenshot ${i + 1}`}
                                className="w-full h-full object-cover rounded"
                              />
                              <button
                                type="button"
                                onClick={() => removeScreenshot(i)}
                                className="absolute -top-1 -right-1 bg-red-500 rounded-full p-1"
                              >
                                <X className="h-3 w-3 text-white" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                </div>
                {/* Number Inputs */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-text-clr-light">Price ($)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.price || 0}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price: parseFloat(e.target.value),
                        })
                      }
                      className="bg-app border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-text-clr-light">
                      Original Price ($)
                    </Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.originalPrice || 0}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          originalPrice: parseFloat(e.target.value),
                        })
                      }
                      className="bg-app border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-text-clr-light">
                      Current Price ($)
                    </Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.currentPrice || 0}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          currentPrice: parseFloat(e.target.value),
                        })
                      }
                      className="bg-app border-gray-700 text-white"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-text-clr-light">Discount (%)</Label>
                    <Input
                      type="number"
                      value={formData.discount || 0}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          discount: parseFloat(e.target.value),
                        })
                      }
                      className="bg-app border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-text-clr-light">Rating</Label>
                    <Input
                      type="number"
                      step="0.1"
                      max="5"
                      value={formData.rating || 0}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          rating: parseFloat(e.target.value),
                        })
                      }
                      className="bg-app border-gray-700 text-white"
                    />
                  </div>
                </div>
                {/* Date Inputs */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-text-clr-light">
                      Available Date
                    </Label>
                    <Input
                      type="date"
                      value={formData.availableDate || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          availableDate: e.target.value,
                        })
                      }
                      className="bg-app border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-text-clr-light">Release Date</Label>
                    <Input
                      type="date"
                      value={formData.releaseDate || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          releaseDate: e.target.value,
                        })
                      }
                      className="bg-app border-gray-700 text-white"
                    />
                  </div>
                </div>
                {/* Selectors */}
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label className="text-text-clr-light">Section Type</Label>
                    <Select
                      value={formData.sectionType}
                      onValueChange={(val) =>
                        setFormData({ ...formData, sectionType: val })
                      }
                    >
                      <SelectTrigger className="bg-app border-gray-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-app-secondary border-gray-700">
                        {TITLE_SECTION.map((type) => (
                          <SelectItem
                            key={type}
                            value={type}
                            className="text-text-clr-light"
                          >
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-text-clr-light">Section key</Label>
                    <Select
                      value={formData.gameType}
                      onValueChange={(val) =>
                        setFormData({ ...formData, gameType: val })
                      }
                    >
                      <SelectTrigger className="bg-app border-gray-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-app-secondary border-gray-700">
                        {SECTION_KEYS.map((type) => (
                          <SelectItem
                            key={type}
                            value={type}
                            className="text-text-clr-light"
                          >
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-text-clr-light">Price Type</Label>
                    <Select
                      value={formData.priceType}
                      onValueChange={(val) =>
                        setFormData({ ...formData, priceType: val })
                      }
                    >
                      <SelectTrigger className="bg-app border-gray-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-app-secondary border-gray-700">
                        {PRICE_TYPES.map((type) => (
                          <SelectItem
                            key={type}
                            value={type}
                            className="text-text-clr-light"
                          >
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-text-clr-light">Status</Label>
                  <Select
                    value={formData.status || ""}
                    onValueChange={(val) =>
                      setFormData({ ...formData, status: val })
                    }
                  >
                    <SelectTrigger className="bg-app border-gray-700 text-white">
                      <SelectValue placeholder="Select status" />nnnnnnnnn
                    </SelectTrigger>
                    <SelectContent className="bg-app-secondary border-gray-700">
                      {STATUS_OPTIONS.map((status) => (
                        <SelectItem
                          key={status}
                          value={status}
                          className="text-text-clr-light"
                        >
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Platforms */}
                <div className="space-y-2">
                  <Label className="text-text-clr-light">Platforms</Label>
                  <div className="flex flex-wrap gap-2">
                    {PLATFORMS.map((platform) => (
                      <div
                        key={platform}
                        onClick={() => togglePlatform(platform)}
                        className={` cursor-pointer text-[12px] text-center p-1 rounded-full ${
                          formData.platforms.includes(platform)
                            ? "bg-btn-primary text-black"
                            : "bg-app text-text-clr-light"
                        }`}
                      >
                        {platform}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Genres */}
                <div className="space-y-2">
                  <Label className="text-text-clr-light">Genres</Label>
                  <div className="flex flex-wrap gap-2">
                    {GENRES.map((genre) => (
                      <div
                        key={genre}
                        onClick={() => toggleGenre(genre)}
                        className={`cursor-pointer text-[12px] text-center p-1 rounded-full ${
                          formData.genres.includes(genre)
                            ? "bg-btn-primary text-black "
                            : "bg-app text-text-clr-light"
                        }`}
                      >
                        {genre}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Toggles */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center justify-between p-4 bg-app rounded-lg">
                    <Label className="text-text-clr-light">View More</Label>
                    <Switch
                      checked={formData.viewMore}
                      onCheckedChange={(val) =>
                        setFormData({ ...formData, viewMore: val })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-app rounded-lg">
                    <Label className="text-text-clr-light">View All</Label>
                    <Switch
                      checked={formData.viewAll}
                      onCheckedChange={(val) =>
                        setFormData({ ...formData, viewAll: val })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-app rounded-lg">
                    <Label className="text-text-clr-light">Featured</Label>
                    <Switch
                      checked={formData.featured}
                      onCheckedChange={(val) =>
                        setFormData({ ...formData, featured: val })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-app rounded-lg">
                    <Label className="text-text-clr-light">Is Free</Label>
                    <Switch
                      checked={formData.isFree}
                      onCheckedChange={(val) =>
                        setFormData({ ...formData, isFree: val })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-app rounded-lg">
                    <Label className="text-text-clr-light">
                      Trial Available
                    </Label>
                    <Switch
                      checked={formData.trialAvailable}
                      onCheckedChange={(val) =>
                        setFormData({ ...formData, trialAvailable: val })
                      }
                    />
                  </div>
                </div>

                {/* Button Config */}
                <div className="space-y-4 p-4 bg-app rounded-lg">
                  <div className="flex items-center justify-between">
                    <Label className="text-white">Button Configuration</Label>
                    <Switch
                      checked={formData.button?.enabled}
                      onCheckedChange={(val) =>
                        setFormData({
                          ...formData,
                          button: { ...formData.button!, enabled: val },
                        })
                      }
                    />
                  </div>
                  {formData.button?.enabled && (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-text-clr-light">
                          Button Text
                        </Label>
                        <Input
                          value={formData.button.text}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              button: {
                                ...formData.button!,
                                text: e.target.value,
                              },
                            })
                          }
                          className="bg-app-secondary border-gray-700 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-text-clr-light">
                          Button Link
                        </Label>
                        <Input
                          value={formData.button.link}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              button: {
                                ...formData.button!,
                                link: e.target.value,
                              },
                            })
                          }
                          placeholder="https://..."
                          className="bg-app-secondary border-gray-700 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-text-clr-light">
                          Button Type
                        </Label>
                        <Select
                          value={formData.button.type}
                          onValueChange={(val) =>
                            setFormData({
                              ...formData,
                              button: { ...formData.button!, type: val },
                            })
                          }
                        >
                          <SelectTrigger className="bg-app-secondary border-gray-700 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-app border-gray-700">
                            {PRICE_TYPES.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-text-clr-light">
                          Button Style
                        </Label>
                        <Select
                          value={formData.button.style}
                          onValueChange={(val) =>
                            setFormData({
                              ...formData,
                              button: { ...formData.button!, style: val },
                            })
                          }
                        >
                          <SelectTrigger className="bg-app-secondary border-gray-700 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-app border-gray-700">
                            {BUTTON_STYLES.map((style) => (
                              <SelectItem key={style} value={style}>
                                {style}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4">
                  <Button
                    onClick={handleSubmitData}
                    className="flex-1 bg-btn-primary hover:bg-btn-primary/60 hover:text-black text-white"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    {editingId ? "Update Game" : "Add Game"}
                  </Button>
                  {editingId && (
                    <Button
                      onClick={() => {
                        resetForm();
                        setEditingId(null);
                      }}
                      variant="outline"
                      className="border-gray-700 text-text-clr-light hover:bg-app"
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="manage">
            <Card className="bg-app-secondary border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Manage Games</CardTitle>
                <CardDescription className="text-text-clr-light">
                  View and edit your games
                </CardDescription>
              </CardHeader>
              <CardContent>
                {games.length === 0 ? (
                  <div className="text-center text-text-clr-light py-8">
                    No games added yet. Add your first game!
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {games.map((game) => (
                      <div
                        key={game._id ?? game.title}
                        className="bg-app rounded-lg border border-gray-700 overflow-hidden"
                      >
                        <img
                          src={game.mainImage}
                          alt={game.title}
                          className="w-full h-40 object-cover"
                        />
                        <div className="p-4 space-y-2">
                          <h3 className="font-bold text-white truncate">
                            {game.title}
                          </h3>
                          <p className="text-sm text-text-clr-light line-clamp-2">
                            {game.description}
                          </p>
                          <div className="flex gap-2 flex-wrap">
                            <div className="bg-blue-600 text-white">
                              {game.sectionType}
                            </div>
                            <div className="bg-green-600 text-white">
                              {game.gameType}
                            </div>
                            {game.isFree && (
                              <div className="bg-yellow-600 text-white">
                                FREE
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2 pt-2">
                            <Button
                              onClick={() => {
                                handleEdit(game);
                              }}
                              size="sm"
                              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                            >
                              <Eye className="h-4 w-4 mr-1" /> Edit
                            </Button>
                            <Button
                              onClick={() =>
                                handleDelete(game._id ?? game.id ?? "")
                              }
                              size="sm"
                              variant="destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <div>
            <ManagesGames handleDelete={handleDelete} handleEdit={handleEdit} />
          </div>
        </Tabs>
      </div>
    </div>
  );
}
