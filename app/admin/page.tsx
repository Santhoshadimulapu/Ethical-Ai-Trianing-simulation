"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck, Plus, Trash2, ChevronDown, ChevronUp,
  BookOpen, PlusCircle, Save, LogOut, AlertTriangle,
} from "lucide-react";
import { getUser, logout } from "@/lib/auth";
import {
  DEFAULT_SCENARIOS,
  getCustomScenarios,
  addScenario,
  deleteScenario,
  type Scenario,
  type Choice,
} from "@/lib/scenarios";

const EMPTY_CHOICE: Choice = { text: "", consequence: "", type: "positive" };

function emptyScenario() {
  return {
    category: "",
    title: "",
    description: "",
    choices: [
      { ...EMPTY_CHOICE },
      { ...EMPTY_CHOICE },
    ] as Choice[],
  };
}

export default function AdminPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [customScenarios, setCustomScenarios] = useState<Scenario[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [expandedDefaults, setExpandedDefaults] = useState(false);
  const [form, setForm] = useState(emptyScenario());
  const [saved, setSaved] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  // Auth guard
  useEffect(() => {
    const user = getUser();
    if (!user || user.role !== "admin") {
      router.replace("/login");
      return;
    }
    setUserName(user.name);
    setCustomScenarios(getCustomScenarios());
  }, [router]);

  function refresh() {
    setCustomScenarios(getCustomScenarios());
  }

  // ── Form helpers ────────────────────────────────────────────────────────────
  function setChoiceField(
    index: number,
    field: keyof Choice,
    value: string
  ) {
    setForm((prev) => {
      const choices = prev.choices.map((c, i) =>
        i === index ? { ...c, [field]: value } : c
      );
      return { ...prev, choices };
    });
  }

  function addChoice() {
    if (form.choices.length >= 6) return;
    setForm((prev) => ({
      ...prev,
      choices: [...prev.choices, { ...EMPTY_CHOICE }],
    }));
  }

  function removeChoice(index: number) {
    if (form.choices.length <= 2) return;
    setForm((prev) => ({
      ...prev,
      choices: prev.choices.filter((_, i) => i !== index),
    }));
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim() || !form.category.trim()) return;
    const validChoices = form.choices.filter((c) => c.text.trim() && c.consequence.trim());
    if (validChoices.length < 2) return;

    addScenario({ ...form, choices: validChoices });
    refresh();
    setForm(emptyScenario());
    setShowForm(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function handleDelete(id: number) {
    deleteScenario(id);
    refresh();
    setDeleteConfirm(null);
  }

  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <div className="min-h-screen bg-background py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Admin Panel</h1>
              <p className="text-sm text-muted-foreground">Logged in as <strong>{userName}</strong></p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={() => router.push("/")} className="bg-transparent">
              View Site
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout} className="bg-transparent text-destructive hover:text-destructive">
              <LogOut className="h-4 w-4 mr-1" /> Logout
            </Button>
          </div>
        </div>

        {/* Success banner */}
        {saved && (
          <div className="mb-6 flex items-center gap-2 text-sm text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-xl px-4 py-3">
            <Save className="h-4 w-4" /> Scenario saved successfully!
          </div>
        )}

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
          <Card className="text-center py-4">
            <CardContent className="p-0">
              <div className="text-3xl font-bold text-primary">{DEFAULT_SCENARIOS.length}</div>
              <div className="text-xs text-muted-foreground mt-1">Built-in Scenarios</div>
            </CardContent>
          </Card>
          <Card className="text-center py-4">
            <CardContent className="p-0">
              <div className="text-3xl font-bold text-primary">{customScenarios.length}</div>
              <div className="text-xs text-muted-foreground mt-1">Custom Scenarios</div>
            </CardContent>
          </Card>
          <Card className="text-center py-4">
            <CardContent className="p-0">
              <div className="text-3xl font-bold text-primary">{DEFAULT_SCENARIOS.length + customScenarios.length}</div>
              <div className="text-xs text-muted-foreground mt-1">Total Active</div>
            </CardContent>
          </Card>
        </div>

        {/* Add Scenario Button */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Manage Scenarios</h2>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="gap-2"
          >
            {showForm ? <ChevronUp className="h-4 w-4" /> : <PlusCircle className="h-4 w-4" />}
            {showForm ? "Close Form" : "Add New Scenario"}
          </Button>
        </div>

        {/* Add Scenario Form */}
        {showForm && (
          <Card className="mb-8 border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Plus className="h-5 w-5 text-primary" /> New Scenario
              </CardTitle>
              <CardDescription>
                Fill in the scenario details. Minimum 2 choices, maximum 6 choices.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-5">
                {/* Title */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g. AI in Healthcare"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category / Slug *</Label>
                    <Input
                      id="category"
                      placeholder="e.g. ai-in-healthcare (no spaces)"
                      value={form.category}
                      onChange={(e) =>
                        setForm({ ...form, category: e.target.value.replace(/\s+/g, "-").toLowerCase() })
                      }
                      required
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Scenario Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the ethical dilemma in detail..."
                    className="min-h-[90px]"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    required
                  />
                </div>

                {/* Choices */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-semibold">
                      Choices ({form.choices.length}/6)
                    </Label>
                    {form.choices.length < 6 && (
                      <Button type="button" variant="outline" size="sm" onClick={addChoice} className="gap-1 bg-transparent">
                        <Plus className="h-3 w-3" /> Add Choice
                      </Button>
                    )}
                  </div>

                  {form.choices.map((choice, idx) => (
                    <div key={idx} className="p-4 border rounded-xl space-y-3 bg-muted/30">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-muted-foreground">
                          Choice {String.fromCharCode(65 + idx)}
                        </span>
                        {form.choices.length > 2 && (
                          <button
                            type="button"
                            onClick={() => removeChoice(idx)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>

                      <Input
                        placeholder="Choice text (what the user can select)"
                        value={choice.text}
                        onChange={(e) => setChoiceField(idx, "text", e.target.value)}
                        required
                      />
                      <Textarea
                        placeholder="Consequence explanation shown after selection"
                        className="min-h-[60px]"
                        value={choice.consequence}
                        onChange={(e) => setChoiceField(idx, "consequence", e.target.value)}
                        required
                      />
                      <div className="flex gap-2">
                        {(["positive", "negative", "mixed"] as const).map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setChoiceField(idx, "type", t)}
                            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                              choice.type === t
                                ? t === "positive"
                                  ? "bg-green-600 text-white border-green-600"
                                  : t === "negative"
                                  ? "bg-red-600 text-white border-red-600"
                                  : "bg-yellow-500 text-white border-yellow-500"
                                : "bg-transparent border-border text-muted-foreground hover:border-primary"
                            }`}
                          >
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <Button type="submit" className="w-full gap-2">
                  <Save className="h-4 w-4" /> Save Scenario
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Custom Scenarios */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <PlusCircle className="h-5 w-5 text-primary" />
            Custom Scenarios
            <Badge variant="default" className="ml-1">{customScenarios.length}</Badge>
          </h3>

          {customScenarios.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <PlusCircle className="h-10 w-10 text-muted-foreground mb-3" />
                <p className="font-medium text-muted-foreground">No custom scenarios yet</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Click "Add New Scenario" above to create your first one.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {customScenarios.map((scenario) => (
                <Card key={scenario.id} className="border-2 border-primary/10">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base">{scenario.title}</CardTitle>
                        <CardDescription className="mt-1 line-clamp-2">
                          {scenario.description}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2 ml-3 flex-shrink-0">
                        <Badge variant="outline" className="text-xs whitespace-nowrap">
                          {scenario.choices.length} choices
                        </Badge>
                        {deleteConfirm === scenario.id ? (
                          <div className="flex gap-1">
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(scenario.id)}
                              className="h-7 px-2 text-xs"
                            >
                              Confirm
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setDeleteConfirm(null)}
                              className="h-7 px-2 text-xs bg-transparent"
                            >
                              Cancel
                            </Button>
                          </div>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setDeleteConfirm(scenario.id)}
                            className="h-7 px-2 text-destructive hover:text-destructive bg-transparent border-destructive/30"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="text-xs">{scenario.category}</Badge>
                      {scenario.choices.map((c, i) => (
                        <Badge
                          key={i}
                          className={`text-xs ${
                            c.type === "positive"
                              ? "bg-green-600/20 text-green-700 dark:text-green-400"
                              : c.type === "negative"
                              ? "bg-red-600/20 text-red-700 dark:text-red-400"
                              : "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400"
                          }`}
                        >
                          {String.fromCharCode(65 + i)}: {c.type}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Default / Built-in Scenarios (collapsible) */}
        <div>
          <button
            type="button"
            onClick={() => setExpandedDefaults(!expandedDefaults)}
            className="w-full flex items-center justify-between p-4 bg-muted/40 rounded-xl border hover:border-primary/30 transition-all"
          >
            <div className="flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-muted-foreground" />
              <span className="font-semibold">
                Built-in Scenarios
                <Badge variant="outline" className="ml-2 text-xs">{DEFAULT_SCENARIOS.length}</Badge>
              </span>
              <span className="text-sm text-muted-foreground hidden sm:inline">(read-only)</span>
            </div>
            {expandedDefaults ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </button>

          {expandedDefaults && (
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg px-3 py-2">
                <AlertTriangle className="h-3.5 w-3.5 text-yellow-600" />
                Built-in scenarios are part of the application and cannot be deleted here.
              </div>
              {DEFAULT_SCENARIOS.map((scenario) => (
                <Card key={scenario.id} className="opacity-80">
                  <CardHeader className="pb-1">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">{scenario.title}</CardTitle>
                      <div className="flex gap-1">
                        <Badge variant="outline" className="text-xs">{scenario.choices.length} choices</Badge>
                        <Badge variant="secondary" className="text-xs">{scenario.category}</Badge>
                      </div>
                    </div>
                    <CardDescription className="text-xs line-clamp-2 mt-1">
                      {scenario.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
